/* ─────────────────────────────────────────────────────────────
   MapHeader.tsx
   Верхняя полоса страницы карты (h-14, border-b).

   ЧТО ДЕЛАЕТ:
   - Слева: ссылка «назад» на лендинг, логотип, <FloorSelector>
   - Справа: индикатор «Онлайн», кнопка настроек (декор), аватар пользователя
   - Аватар — пока хардкод «АС», зелёная точка онлайн-статуса

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Кнопка Settings ни к чему не подключена (нет дропдауна)
   - Аватар не читает реального пользователя (нет сессии/auth)
   - «Онлайн» — статичный текст, не смотрит на WebSocket
───────────────────────────────────────────────────────────────*/

import Link from "next/link";
import { ArrowLeft, Building2, Settings } from "lucide-react";
import { FloorSelector } from "./FloorSelector";

interface MapHeaderProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export function MapHeader({ currentFloor, onFloorChange }: MapHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 h-14 border-b border-zinc-100 bg-white shrink-0 z-10">
      {/* Левая часть */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors mr-2"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">SmartSpace</span>
        </Link>

        <div className="h-7 w-7 rounded-lg bg-zinc-900 flex items-center justify-center">
          <Building2 size={14} className="text-white" />
        </div>

        <FloorSelector currentFloor={currentFloor} onFloorChange={onFloorChange} />
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-3">
        {/* Статус соединения — потом подключишь к WebSocket */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Онлайн
        </div>

        {/* TODO: открывать меню настроек */}
        <button className="h-8 w-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors">
          <Settings size={15} />
        </button>

        {/* TODO: подключить реального пользователя из сессии (next-auth / clerk) */}
        <div className="relative cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold select-none">
            АС
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
      </div>
    </header>
  );
}
