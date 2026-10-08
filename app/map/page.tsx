/* ─────────────────────────────────────────────────────────────
   app/map/page.tsx  — Оркестратор страницы карты.

   ЧТО ДЕЛАЕТ ЭТОТ ФАЙЛ:
   - Хранит весь UI-state страницы:
       selectedRoomId  — какая комната выделена
       currentFloor    — активный этаж (1 / 2 / 3)
       zoom            — текущий масштаб карты
       filterDate/From/To — значения полей фильтра
   - Вычисляет selectedRoom из selectedRoomId + ROOM_DETAILS
   - Передаёт state и коллбеки в дочерние компоненты
   - Собирает лейаут: Header | (Canvas + Sidebar) | MobileSheet

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Нет загрузки данных с сервера — замени ROOM_DETAILS на fetch
   - handleFloorChange не загружает новые roomStatuses — добавь
   - roomStatuses — пока не передаётся, карта использует DEMO_STATUSES
───────────────────────────────────────────────────────────────*/

"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { MapHeader } from "@/components/map/MapHeader";
import { MapCanvas } from "@/components/map/MapCanvas";
import { SidebarEmpty } from "@/components/map/SidebarEmpty";
import { SidebarRoom } from "@/components/map/SidebarRoom";
import { MobileSheet } from "@/components/map/MobileSheet";
import { ROOMS } from "@/components/map/types";

export default function MapPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [zoom, setZoom] = useState(1);

  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const selectedRoom = selectedRoomId
    ? (ROOMS.filter((room) => room.id === selectedRoomId)[0] ?? null)
    : null;

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId((prev) => (prev === roomId ? null : roomId));
    // TODO: можно добавить проверку статуса (занято → не открывать форму)
  };

  const handleDeselectRoom = () => setSelectedRoomId(null);

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
    setSelectedRoomId(null);
    // TODO: загрузить roomStatuses для нового этажа из API
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));

  console.log(filterDate, filterFrom, filterTo);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">
      <MapHeader
        currentFloor={currentFloor}
        onFloorChange={handleFloorChange}
      />

      <div className="flex flex-1 overflow-hidden">
        <MapCanvas
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          currentFloor={currentFloor}
          selectedRoom={selectedRoom}
          selectedRoomId={selectedRoomId}
          onRoomSelect={handleRoomSelect}
          onDeselectRoom={handleDeselectRoom}
          // TODO: передать roomStatuses={roomStatuses} когда подключишь API
        />

        {/* Правый сайдбар (только desktop) */}
        <aside className="w-[360px] shrink-0 border-l border-zinc-100 bg-white hidden md:flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              {selectedRoom ? "Детали места" : "Бронирование"}
            </span>
            {selectedRoom && (
              <button
                onClick={handleDeselectRoom}
                className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={13} />
                Назад
              </button>
            )}
          </div>

          {/* Контент сайдбара переключается по selectedRoom */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {selectedRoom ? (
              <SidebarRoom room={selectedRoom} onClose={handleDeselectRoom} />
            ) : (
              <SidebarEmpty
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterFrom={filterFrom}
                setFilterFrom={setFilterFrom}
                filterTo={filterTo}
                setFilterTo={setFilterTo}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Нижний дравер на мобиле */}
      {selectedRoom && (
        <MobileSheet room={selectedRoom} onClose={handleDeselectRoom} />
      )}
    </div>
  );
}
