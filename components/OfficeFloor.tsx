"use client";

import { ROOMS } from "./map/types";

export interface RoomConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
}

export interface RoomStatus {
  id: string;
  status: "free" | "booked";
}

// Демо-статусы — замени на данные из БД / API
const DEMO_STATUSES: RoomStatus[] = [
  { id: "B3", status: "booked" },
  { id: "C2", status: "booked" },
  { id: "A1", status: "booked" },
  { id: "D1", status: "booked" },
];

export interface OfficeFloorProps {
  roomStatuses?: RoomStatus[];
  onRoomSelect?: (roomId: string) => void;
  selectedRoomId?: string | null;
  currentFloor: number;
  onDeselectRoom?: () => void;
}

export default function OfficeFloor({
  roomStatuses = DEMO_STATUSES,
  onRoomSelect,
  selectedRoomId,
  currentFloor,
  onDeselectRoom,
}: OfficeFloorProps) {
  const currentFloorRoomsConfig = ROOMS.filter(
    (room) => room.floor === currentFloor,
  );

  return (
    <svg viewBox="0 0 820 600" className="w-full h-full">
      {/* Контур здания */}
      <rect
        x="30"
        y="30"
        width="750"
        height="540"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="3"
        rx="4"
      />

      {/* Пунктирные коридоры */}
      <line
        x1="190"
        y1="120"
        x2="190"
        y2="440"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line
        x1="250"
        y1="120"
        x2="770"
        y2="120"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line
        x1="250"
        y1="440"
        x2="770"
        y2="440"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* ПРОХОД 1: только заливки всех невыбранных комнат */}
      {currentFloorRoomsConfig
        .filter((room) => room.id !== selectedRoomId)
        .map((room) => {
          const status = roomStatuses.find((d) => d.id === room.id);
          const isFree = status ? status.status === "free" : true;
          return (
            <rect
              key={`fill-${room.id}`}
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx={4}
              fill={isFree ? "#f3e8ff" : "#f5f5f6"}
              stroke="none"
              onClick={() => onRoomSelect?.(room.id)}
              className="cursor-pointer"
            />
          );
        })}

      {/* ПРОХОД 2а: обводки занятых комнат (рисуются первыми, снизу) */}
      {currentFloorRoomsConfig
        .filter((room) => {
          if (room.id === selectedRoomId) return false;
          const status = roomStatuses.find((d) => d.id === room.id);
          const isFree = status ? status.status === "free" : true;
          return !isFree;
        })
        .map((room) => (
          <g
            key={`stroke-${room.id}`}
            onClick={() => {
              onRoomSelect?.(room.id);
            }}
            className="cursor-pointer"
          >
            {/* Hover-подсветка */}
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx={4}
              fill="#f0f0f0"
              stroke="none"
              opacity={0}
              className="transition-all duration-150 hover:opacity-100 pointer-events-none"
            />
            {/* Обводка */}
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx={4}
              fill="none"
              stroke="#d4d4d8"
              strokeWidth={1.5}
              className="pointer-events-none"
            />
            {/* Метка */}
            <text
              x={room.x + room.w / 2}
              y={room.y + room.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={room.w < 90 ? 9 : 11}
              fontWeight="500"
              fill="#a8a8b0"
              className="pointer-events-none select-none"
            >
              {room.name}
            </text>
            {/* Индикатор статуса */}
            <circle
              cx={room.x + room.w - 10}
              cy={room.y + 10}
              r={4}
              fill="#d4d4d8"
              className="pointer-events-none"
            />
          </g>
        ))}

      {/* ПРОХОД 2б: обводки свободных комнат (рисуются сверху — фиолетовые не перекрываются) */}
      {currentFloorRoomsConfig
        .filter((room) => {
          if (room.id === selectedRoomId) return false;
          const status = roomStatuses.find((d) => d.id === room.id);
          const isFree = status ? status.status === "free" : true;
          return isFree;
        })
        .map((room) => (
          <g
            key={`stroke-${room.id}`}
            onClick={() => onRoomSelect?.(room.id)}
            className="cursor-pointer"
          >
            {/* Hover-подсветка */}
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx={4}
              fill="#e9d5ff"
              stroke="none"
              opacity={0}
              className="transition-all duration-150 hover:opacity-100 pointer-events-none"
            />
            {/* Обводка */}
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              rx={4}
              fill="none"
              stroke="#9333ea"
              strokeWidth={1.5}
              className="pointer-events-none"
            />
            {/* Метка */}
            <text
              x={room.x + room.w / 2}
              y={room.y + room.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={room.w < 90 ? 9 : 11}
              fontWeight="500"
              fill="#7e22ce"
              className="pointer-events-none select-none"
            >
              {room.name}
            </text>
            {/* Индикатор статуса */}
            <circle
              cx={room.x + room.w - 10}
              cy={room.y + 10}
              r={4}
              fill="#9333ea"
              className="pointer-events-none"
            />
          </g>
        ))}

      {/* ПРОХОД 3: выбранная комната поверх всего */}
      {selectedRoomId &&
        (() => {
          const room = currentFloorRoomsConfig.find(
            (r) => r.id === selectedRoomId,
          );
          if (!room) return null;
          const status = roomStatuses.find((d) => d.id === room.id);
          const isFree = status ? status.status === "free" : true;
          return (
            <g
              key={`selected-${room.id}`}
              onClick={() => onRoomSelect?.(room.id)}
              className="cursor-pointer"
            >
              {/* Заливка */}
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                rx={4}
                fill={isFree ? "#e9d5ff" : "#f5f5f6"}
                stroke="none"
              />
              {/* Обводка */}
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                rx={4}
                fill="none"
                stroke={isFree ? "#7e22ce" : "#c4c4c8"}
                strokeWidth={2.5}
                className="pointer-events-none"
              />
              {/* Метка */}
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={room.w < 90 ? 9 : 11}
                fontWeight="700"
                fill={isFree ? "#7e22ce" : "#c4c4c8"}
                className="pointer-events-none select-none"
              >
                {room.name}
              </text>
              {/* Индикатор статуса */}
              <circle
                cx={room.x + room.w - 10}
                cy={room.y + 10}
                r={4}
                fill={isFree ? "#9333ea" : "#d4d4d8"}
                className="pointer-events-none"
              />
              {/* Пунктирная рамка — рисуется последней, не срезается */}
              <rect
                x={room.x - 4}
                y={room.y - 4}
                width={room.w + 8}
                height={room.h + 8}
                rx={8}
                fill="none"
                stroke={isFree ? "#a855f7" : "#a1a1aa"}
                strokeWidth={2.5}
                strokeDasharray="6 3"
                className="pointer-events-none"
              />
            </g>
          );
        })()}
    </svg>
  );
}
