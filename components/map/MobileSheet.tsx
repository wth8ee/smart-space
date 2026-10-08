/* ─────────────────────────────────────────────────────────────
   MobileSheet.tsx
   Нижний дравер (bottom sheet) для мобильных устройств.
   Появляется поверх карты когда выбрана комната (md:hidden).

   ЧТО ДЕЛАЕТ:
   - Фиксированная панель снизу экрана (fixed bottom-0)
   - Серая «ручка» drag-indicator сверху (декоративная)
   - Название комнаты + кнопка закрыть (X)
   - Бейджи удобств
   - Цена за час
   - Кнопка «Забронировать»

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Нет анимации slide-up (добавь framer-motion или CSS transition)
   - Нет drag-to-close (ручка декоративная)
   - Кнопка «Забронировать» ничего не делает — подключи
     открытие модального окна или разворачивание sheet в полный экран
───────────────────────────────────────────────────────────────*/

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RoomDetails } from "./types";

interface MobileSheetProps {
  room: RoomDetails;
  onClose: () => void;
}

export function MobileSheet({ room, onClose }: MobileSheetProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 rounded-t-2xl shadow-2xl z-50 p-5 pb-8">
      {/* Drag-indicator */}
      <div className="w-8 h-1 bg-zinc-200 rounded-full mx-auto mb-4" />

      {/* Шапка */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-900">{room.name}</h3>
        <button onClick={onClose}>
          <X size={16} className="text-zinc-400" />
        </button>
      </div>

      {/* Бейджи */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {room.amenities.map((a) => (
          <Badge key={a} variant="secondary">{a}</Badge>
        ))}
      </div>

      {/* Цена + CTA */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900">
          {room.pricePerHour.toLocaleString("ru")} ₽ / час
        </span>
        {/* TODO: открывать полную форму (модалку или sheet на весь экран) */}
        <Button size="md" variant="primary">Забронировать</Button>
      </div>
    </div>
  );
}
