import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Globe, ArrowRight, Calendar as CalendarIcon, Clock, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { COMMON_TIMEZONES, convertTime, type ConversionResult } from '@/lib/timezone-service';

export default function App() {
  const [sourceZone, setSourceZone] = useState('America/New_York');
  const [targetZone, setTargetZone] = useState('Asia/Kolkata');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('10:00');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleConvert = () => {
    if (sourceZone && targetZone && date && time) {
      setResult(convertTime(sourceZone, targetZone, date, time));
    }
  };

  // Set initial result on mount
  useEffect(() => {
    handleConvert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans selection:bg-black selection:text-white pb-20">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-xl shadow-black/10">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Timezone Converter
          </h1>
          <p className="text-[#86868B] max-w-md">
            Simple, highly accurate conversions with automatic Daylight Saving Time awareness.
          </p>
        </motion.div>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        <div className="space-y-8">
          
          {/* Main Input Card */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-10 space-y-8">
              
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Source Timezone */}
                <div className="space-y-3">
                  <Label htmlFor="source-zone" className="text-sm font-semibold text-[#1D1D1F] ml-1">
                    From (Source)
                  </Label>
                  <Select value={sourceZone} onValueChange={setSourceZone}>
                    <SelectTrigger id="source-zone" className="h-14 rounded-2xl border-[#E5E5E5] bg-[#F5F5F7] focus:ring-black focus:border-black transition-all">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_TIMEZONES.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Timezone */}
                <div className="space-y-3">
                  <Label htmlFor="target-zone" className="text-sm font-semibold text-[#1D1D1F] ml-1">
                    To (Target)
                  </Label>
                  <Select value={targetZone} onValueChange={setTargetZone}>
                    <SelectTrigger id="target-zone" className="h-14 rounded-2xl border-[#E5E5E5] bg-[#F5F5F7] focus:ring-black focus:border-black transition-all">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_TIMEZONES.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {/* Date Picker */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-[#1D1D1F] ml-1">
                    Select Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-14 rounded-2xl justify-start text-left font-normal border-[#E5E5E5] bg-[#F5F5F7] hover:bg-white transition-all",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-[#86868B]" />
                        {date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED) : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden border-none shadow-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Input */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-[#1D1D1F] ml-1">
                    Select Time
                  </Label>
                  <div className="relative group">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-14 rounded-2xl border-[#E5E5E5] bg-[#F5F5F7] pl-12 focus:ring-black focus:border-black transition-all"
                    />
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B] group-focus-within:text-black transition-colors" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleConvert}
                className="w-full h-14 rounded-2xl bg-black text-white hover:bg-[#1D1D1F] text-lg font-bold shadow-xl shadow-black/10 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                Convert Time
              </Button>

            </CardContent>
          </Card>

          {/* Results Presentation */}
          {result && (
            <motion.div
              key={`${result.target.time}-${result.target.date}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86868B]">Converted Result</p>
              </div>

              <div className="bg-white rounded-3xl p-10 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <div>
                    <h2 className="text-7xl sm:text-8xl font-black tabular-nums tracking-tighter text-black mb-2">
                      {result.target.time}
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl font-bold bg-black text-white px-3 py-1 rounded-lg">
                        {result.target.abbreviation}
                      </span>
                      <p className="text-xl font-medium text-[#424245]">
                        {result.target.date}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-[#F0F0F0] max-w-[200px] mx-auto" />

                  <div className="flex flex-col items-center gap-3">
                    <div className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide border-2",
                      result.target.isDST 
                        ? "bg-orange-50 text-orange-900 border-orange-200" 
                        : "bg-blue-50 text-blue-900 border-blue-200"
                    )}>
                      <Info className="w-4 h-4" />
                      Daylight Saving Status: {result.target.isDST ? "Active" : "Not Active"}
                    </div>
                    
                    <p className="text-xs text-[#86868B] font-medium leading-relaxed max-w-sm px-6">
                      Calculated using the <span className="text-black font-bold">IANA Database</span>: 
                      {result.target.offset}.
                    </p>
                  </div>
                </div>
                
                {/* Subtle Background Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Clock className="w-48 h-48" />
                </div>
              </div>

              {/* Input Summary */}
              <div className="text-center pt-4">
                <p className="text-sm text-[#86868B]">
                  Converted from <span className="font-bold text-black">{result.source.time} {result.source.abbreviation}</span> on {result.source.date}
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-6 mt-20 text-center border-t border-[#E5E5E5] pt-12">
        <div className="flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 opacity-40">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Certified Accuracy</span>
          </div>
          <p className="text-[#86868B] text-[11px] max-w-xs leading-relaxed">
            Automatic UTC baseline calculations ensuring precision for global teams across all Daylight Saving transitions.
          </p>
        </div>
      </footer>
    </div>
  );
}
