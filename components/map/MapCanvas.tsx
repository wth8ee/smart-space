/* ─────────────────────────────────────────────────────────────
   MapCanvas.tsx
   Зона с SVG-картой этажа: серый фон, зум, бейдж этажа,
   всплывающий тултип при выборе комнаты.

   ЧТО ДЕЛАЕТ:
   - Обёртывает <OfficeFloor> в контейнер с CSS transform: scale()
   - Кнопки + / − меняют zoom снаружи через onZoomIn / onZoomOut
   - Показывает «Этаж N» в левом верхнем углу
   - Если комната выбрана — показывает тёмный тултип по центру сверху
     с именем комнаты и крестиком для снятия выбора
   - Показывает процент зума в правом нижнем углу

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Не управляет самим zoom (state живёт в page.tsx)
   - Не управляет selectedRoomId (state живёт в page.tsx)
   - Зум через CSS scale — не меняет реальный viewport SVG;
     если нужен полноценный pan+zoom, замени на библиотеку
     (например react-zoom-pan-pinch)
───────────────────────────────────────────────────────────────*/

import { Building2, MapPin, X, ZoomIn, ZoomOut } from "lucide-react";
import OfficeFloor from "@/components/OfficeFloor";
import { Button } from "@/components/ui/button";
import type { Room, RoomDetails, RoomStatus } from "./types";

interface MapCanvasProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentFloor: number;
  selectedRoom: Room | null;
  selectedRoomId: string | null;
  onRoomSelect: (roomId: string) => void;
  onDeselectRoom: () => void;
  roomStatuses?: RoomStatus[];
}

export function MapCanvas({
  zoom,
  onZoomIn,
  onZoomOut,
  currentFloor,
  selectedRoom,
  selectedRoomId,
  onRoomSelect,
  onDeselectRoom,
  roomStatuses,
}: MapCanvasProps) {
  const title = !selectedRoom
    ? ""
    : selectedRoom.name?.includes("Переговорка") ||
        selectedRoom.name.includes("Кабина")
      ? "выбрана"
      : "выбран";

  return (
    <main
      className="flex-1 relative bg-slate-50 overflow-hidden"
      style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)" }}
    >
      {/* SVG-карта с CSS-зумом */}
      <div
        className="w-full h-full flex items-center justify-center p-6"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease",
        }}
      >
        {/* TODO: Вставить компонент OfficeMap SVG сюда */}
        <OfficeFloor
          selectedRoomId={selectedRoomId}
          onRoomSelect={onRoomSelect}
          roomStatuses={roomStatuses}
          currentFloor={currentFloor}
          onDeselectRoom={onDeselectRoom}
          // TODO: передать roomStatuses с реальными данными из API/Pusher
        />
      </div>

      {/* Бейдж текущего этажа (левый верхний угол) */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white rounded-lg border border-zinc-200 shadow-sm px-3 py-1.5 text-xs text-zinc-600 font-medium">
        <Building2 size={12} className="text-zinc-400" />
        Этаж {currentFloor}
      </div>

      {/* Тултип выбранной комнаты (центр сверху) */}
      {selectedRoom && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900 text-white rounded-full px-4 py-1.5 text-xs font-medium shadow-lg">
          <MapPin size={11} />
          {selectedRoom.name} {title}
          <button onClick={onDeselectRoom}>
            <X size={11} className="opacity-70 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Кнопки зума (правый нижний угол) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-px shadow-md rounded-lg overflow-hidden border border-zinc-200">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          className="rounded-none border-0 border-b border-zinc-200 bg-white"
          aria-label="Увеличить"
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          className="rounded-none border-0 bg-white"
          aria-label="Уменьшить"
        >
          <ZoomOut size={16} />
        </Button>
      </div>

      {/* Индикатор зума в % */}
      <div className="absolute bottom-6 right-20 bg-white border border-zinc-200 rounded-md px-2 py-1 text-[11px] text-zinc-400 shadow-sm">
        {Math.round(zoom * 100)}%
      </div>
    </main>
  );
}
