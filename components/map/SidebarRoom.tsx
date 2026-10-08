/* ─────────────────────────────────────────────────────────────
   SidebarRoom.tsx
   Правый сайдбар когда комната выбрана.
   Показывает детали комнаты и форму бронирования.

   ЧТО ДЕЛАЕТ:
   - Шапка: название комнаты + этаж + кнопка «закрыть» (X)
   - Бейджи удобств с иконками
   - Цена за час
   - HTML-форма с полями: дата, время с/по, кофе-брейк (Switch)
   - Блок «Итого» — пока заглушка «— ₽»
   - Кнопка «Забронировать» — вызывает onSubmit → console.log

   ЧТО НЕ ДЕЛАЕТ (твоя задача — подключить по шагам):
   1. Нет валидации — подключи useForm + zodResolver
      (заменить const [coffeeBreak] на useForm)
   2. <input type="date"> не подключён к форме — добавь {...register("date")}
   3. <Select> не подключён — обернуть в <Controller>
   4. <Switch> не подключён — обернуть в <Controller>
   5. Итого «— ₽» — посчитать через watch("timeFrom") и watch("timeTo")
   6. onSubmit — заменить console.log на fetch("/api/bookings", ...)
───────────────────────────────────────────────────────────────*/

"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Coffee,
  MapPin,
  Projector,
  Users,
  Wifi,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { RoomDetails } from "./types";
import { TIME_OPTIONS } from "./types";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

/* Иконка для бейджа удобства */
function AmenityIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("проектор")) return <Projector size={11} />;
  if (l.includes("wifi")) return <Wifi size={11} />;
  if (l.includes("кофе")) return <Coffee size={11} />;
  if (l.includes("человек")) return <Users size={11} />;
  return null;
}

interface SidebarRoomProps {
  room: RoomDetails;
  onClose: () => void;
}

export function SidebarRoom({ room, onClose }: SidebarRoomProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [coffeeBreak, setCoffeeBreak] = useState(false);

  const filteredStartTimePOptions = endTime
    ? TIME_OPTIONS.filter((time, i) => i < TIME_OPTIONS.indexOf(endTime))
    : TIME_OPTIONS;

  const filteredEndTimeOptions = startTime
    ? TIME_OPTIONS.filter((time, i) => i > TIME_OPTIONS.indexOf(startTime))
    : TIME_OPTIONS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: заменить console.log на fetch("/api/bookings", ...)
    console.log({ date, startTime, endTime, coffeeBreak });
  };

  const overallHours =
    startTime && endTime
      ? Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 3))
      : null;

  console.log(endTime.slice(0, 2));

  return (
    <div className="flex flex-col gap-0 h-full">
      {/* ── Шапка: название + кнопка закрыть ── */}
      <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">{room.name}</h2>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
            <MapPin size={11} />
            <span>Этаж {room.floor}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors"
          aria-label="Закрыть"
        >
          <X size={15} />
        </button>
      </div>

      {/* ── Удобства ── */}
      <div className="py-4 border-b border-zinc-100">
        <p className="text-xs font-medium text-zinc-500 mb-2">Оснащение</p>
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.map((a) => (
            <Badge key={a} variant="secondary">
              <AmenityIcon label={a} />
              {a}
            </Badge>
          ))}
        </div>
        {room.description && (
          <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
            {room.description}
          </p>
        )}
      </div>

      {/* ── Цена ── */}
      <div className="py-4 border-b border-zinc-100 flex items-center justify-between">
        <span className="text-xs text-zinc-500">Стоимость</span>
        <span className="text-sm font-semibold text-zinc-900">
          {room.pricePerHour.toLocaleString("ru")} ₽ / час
        </span>
      </div>

      {/* ── Форма бронирования ── */}
      <form
        id="sidebar-room"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 py-4 flex-1"
      >
        {/* Дата */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="booking-date">
            <CalendarDays size={12} className="inline mr-1.5 text-zinc-400" />
            Дата
          </Label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex h-9 w-full px-3 py-1 text-sm text-zinc-900 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 hover:border-zinc-300 transition-colors"
          />
        </div>

        {/* Время */}
        <div className="flex flex-col gap-1.5">
          <Label>
            <Clock size={12} className="inline mr-1.5 text-zinc-400" />
            Время
          </Label>
          <div className="flex items-center gap-2">
            <Select
              value={startTime}
              onValueChange={(value) => setStartTime(value)}
              placeholder="С"
              options={filteredStartTimePOptions.map((time, i) => ({
                key: i,
                value: time,
                label: time,
              }))}
              className="flex-1"
            />
            <span className="text-zinc-400 text-sm">—</span>
            <Select
              value={endTime}
              onValueChange={(value) => setEndTime(value)}
              placeholder="По"
              options={filteredEndTimeOptions.map((time, i) => ({
                key: i,
                value: time,
                label: time,
              }))}
              className="flex-1"
            />
          </div>
        </div>

        {/* Кофе-брейк */}
        <div className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Coffee size={14} className="text-amber-500" />
            <div>
              <p className="text-xs font-medium text-zinc-700">Кофе-брейк</p>
              <p className="text-[11px] text-zinc-400">+500 ₽ к заказу</p>
            </div>
          </div>
          <Switch checked={coffeeBreak} onCheckedChange={setCoffeeBreak} />
        </div>

        {/* Итого — заглушка */}
        <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              {overallHours ? overallHours : "N"} ч ×{" "}
              {room.pricePerHour.toLocaleString("ru")} ₽
            </span>
            <span>
              {overallHours ? overallHours * room.pricePerHour : "—"} ₽
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between text-sm font-semibold text-zinc-900">
            <span>Итого</span>
            <span>
              {overallHours ? overallHours * room.pricePerHour : "—"} ₽
            </span>
          </div>
        </div>

        {/* Кнопка отправки */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-auto"
          form="sidebar-room"
        >
          Забронировать
        </Button>
      </form>
    </div>
  );
}
