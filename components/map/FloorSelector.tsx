/* ─────────────────────────────────────────────────────────────
   FloorSelector.tsx
   Три таба для переключения между этажами (1 / 2 / 3).

   ЧТО ДЕЛАЕТ:
   - Рендерит ряд кнопок «Этаж 1», «Этаж 2», «Этаж 3»
   - Активный этаж подсвечен белым фоном (bg-white shadow-sm)
   - При клике вызывает onFloorChange(floor) — родитель решает,
     что делать дальше (загружать данные, сбрасывать выбор и т.д.)

   ЧТО НЕ ДЕЛАЕТ (твоя задача):
   - Не загружает данные — просто сигнализирует родителю
   - Не знает о статусах комнат на каждом этаже
───────────────────────────────────────────────────────────────*/

interface FloorSelectorProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export function FloorSelector({ currentFloor, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
      {[1, 2, 3].map((floor) => (
        <button
          key={floor}
          onClick={() => onFloorChange(floor)}
          className={`
            flex items-center justify-center h-7 w-16 rounded-md text-xs font-medium
            transition-all duration-150
            ${currentFloor === floor
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"}
          `}
        >
          Этаж {floor}
        </button>
      ))}
    </div>
  );
}
