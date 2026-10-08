/* ─────────────────────────────────────────────────────────────
   SidebarEmpty.tsx
   Правый сайдбар когда ни одна комната не выбрана.
   Показывает форму фильтрации и подсказку.

   ЧТО ДЕЛАЕТ:
   - Поле выбора даты (нативный input type="date")
   - Два <Select> для времени «С» и «По»
   - Все значения хранит не сам — получает через пропы и
     сообщает об изменениях через коллбеки (controlled inputs)
   - Иллюстрирует пустое состояние: иконка + текст «Выберите место»
   - Легенда цветов карты (зелёный / красный / выделено)

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Не фильтрует карту по введённым значениям — это нужно
     реализовать в page.tsx: при изменении фильтров делать
     запрос к API и обновлять roomStatuses в OfficeFloor
───────────────────────────────────────────────────────────────*/

import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Select } from "@/components/ui/select";
import { TIME_OPTIONS } from "./types";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface SidebarEmptyProps {
  filterDate: string;
  setFilterDate: (v: string) => void;
  filterFrom: string;
  setFilterFrom: (v: string) => void;
  filterTo: string;
  setFilterTo: (v: string) => void;
}

export function SidebarEmpty({
  filterDate,
  setFilterDate,
  filterFrom,
  setFilterFrom,
  filterTo,
  setFilterTo,
}: SidebarEmptyProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h2 className="text-sm font-semibold text-zinc-900">
          Фильтр бронирования
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Укажите параметры для поиска
        </p>
      </div>

      {/* Дата */}
      <div className="flex flex-col gap-4 py-4 flex-1">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-date">
            <CalendarDays size={12} className="inline mr-1.5 text-zinc-400" />
            Дата
          </Label>
          <input
            id="filter-date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
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
              placeholder="С"
              options={TIME_OPTIONS.map((time, i) => ({
                key: i,
                value: time,
                label: time,
              }))}
              value={filterFrom}
              onValueChange={setFilterFrom}
              className="flex-1"
            />
            <span className="text-zinc-400 text-sm">—</span>
            <Select
              placeholder="По"
              options={TIME_OPTIONS.map((time, i) => ({
                key: i,
                value: time,
                label: time,
              }))}
              value={filterTo}
              onValueChange={setFilterTo}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Подсказка пустого состояния */}
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center">
          <MapPin size={22} className="text-zinc-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-700">
            Выберите место на карте
          </p>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-[220px]">
            Кликните на комнату, чтобы увидеть детали и оформить бронирование
          </p>
        </div>
      </div>

      {/* Легенда */}
      <div className="mt-auto pt-4 border-t border-zinc-100">
        <p className="text-xs font-medium text-zinc-500 mb-3">Обозначения</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-sm bg-violet-100 border border-violet-300" />
            <span className="text-xs text-zinc-500">Свободно</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-sm bg-zinc-200 border border-zinc-300" />
            <span className="text-xs text-zinc-500">Занято</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-sm bg-violet-200 border-2 border-violet-600" />
            <span className="text-xs text-zinc-500">Выбрано</span>
          </div>
        </div>
      </div>
    </div>
  );
}
