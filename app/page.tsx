"use client";

import Link from "next/link";
import {
  Map,
  Zap,
  Settings2,
  ArrowRight,
  ChevronRight,
  Building2,
  Users,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

/* ─────────────────────────────────────────── Navbar */
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-zinc-900"
        >
          <div className="h-7 w-7 rounded-lg bg-zinc-900 flex items-center justify-center">
            <Building2 size={14} className="text-white" />
          </div>
          <span>SmartSpace</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
          >
            Возможности
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
          >
            Цены
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Войти
          </Button>
          <Button variant="primary" size="sm">
            Начать
            <ArrowRight size={13} />
          </Button>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────── Hero */
function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-xs text-zinc-600 font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Обновление в реальном времени
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-zinc-900 mb-6">
            Бронируй идеальное
            <br />
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-400 bg-clip-text text-transparent">
              рабочее место
            </span>
            <br />
            за секунды
          </h1>

          <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            Интерактивная карта офиса в реальном времени. Видите свободные
            переговорки, выбираете — бронируете. Без звонков, без очередей.
          </p>

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <Link href="/map">
              <Button size="lg">
                Смотреть карту
                <Map size={16} />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Узнать больше
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[
                "bg-rose-400",
                "bg-sky-400",
                "bg-amber-400",
                "bg-emerald-400",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full ${color} border-2 border-white`}
                />
              ))}
            </div>
            <div className="text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">2 400+</span> команд
              уже работают в SmartSpace
            </div>
          </div>
        </div>

        {/* Hero visual — placeholder */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative rounded-2xl border border-zinc-200 shadow-2xl shadow-zinc-900/10 overflow-hidden bg-slate-50">
            {/* Fake browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-200 bg-white">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div className="mx-auto h-5 w-48 rounded-md bg-zinc-100 flex items-center justify-center">
                <span className="text-[10px] text-zinc-400">
                  smartspace.app/map
                </span>
              </div>
            </div>

            {/* Fake map UI */}
            <div className="p-4 h-72 relative">
              {/* Legend */}
              <div className="absolute top-6 left-6 flex flex-col gap-1.5 z-10">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <div className="h-2 w-2 rounded-sm bg-emerald-300" />
                  Свободно
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                  <div className="h-2 w-2 rounded-sm bg-rose-300" />
                  Занято
                </div>
              </div>

              {/* Floor grid mockup */}
              <div className="w-full h-full rounded-lg bg-white border border-zinc-100 relative overflow-hidden p-6">
                <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
                  {[
                    "bg-emerald-100",
                    "bg-rose-100",
                    "bg-emerald-100",
                    "bg-emerald-100",
                    "bg-rose-100",
                    "bg-emerald-100",
                    "bg-rose-100",
                    "bg-emerald-100",
                    "bg-emerald-100",
                    "bg-emerald-100",
                    "bg-rose-100",
                    "bg-emerald-100",
                  ].map((color, i) => (
                    <div
                      key={i}
                      className={`${color} rounded-md border border-zinc-100 flex items-center justify-center`}
                    >
                      {i === 1 && (
                        <span className="text-[8px] font-medium text-rose-500">
                          Занято
                        </span>
                      )}
                      {i === 0 && (
                        <span className="text-[8px] font-medium text-emerald-600">
                          Свободно
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating booking card */}
              <div className="absolute bottom-8 right-8 bg-white rounded-xl border border-zinc-200 shadow-lg p-3 w-36">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-700">
                    Переговорка А
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400">09:00 – 11:00</div>
                <div className="mt-2 h-5 rounded bg-zinc-900 flex items-center justify-center">
                  <span className="text-[9px] text-white font-medium">
                    Забронировать
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Stats */
function StatsRow() {
  const stats = [
    { label: "Рабочих мест", value: "500+" },
    { label: "Бронирований в день", value: "1 200+" },
    { label: "Клиентов", value: "340+" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <section className="border-y border-zinc-100 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold text-zinc-900">{s.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Features */
const features = [
  {
    icon: Map,
    title: "Интерактивная карта",
    description:
      "Видите планировку всего офиса в реальном времени. Зелёный — свободно, красный — занято. Кликайте и бронируйте за 2 секунды.",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    cardAccent: "hover:border-blue-200 hover:shadow-blue-50",
  },
  {
    icon: Zap,
    title: "Статусы в реальном времени",
    description:
      "WebSocket-обновления без перезагрузки страницы. Коллеги видят вашу бронь мгновенно — никаких конфликтов.",
    iconBg: "bg-gradient-to-br from-orange-400 to-rose-500",
    cardAccent: "hover:border-orange-200 hover:shadow-orange-50",
  },
  {
    icon: Settings2,
    title: "Гибкие настройки",
    description:
      "Выбирайте этаж, временной слот, добавляйте кофе-брейки и оборудование. Фильтрация под любые нужды команды.",
    iconBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
    cardAccent: "hover:border-teal-200 hover:shadow-teal-50",
  },
  {
    icon: Users,
    title: "Управление командой",
    description:
      "Просматривайте бронирования всей команды на одном дашборде. Управляйте правами доступа для каждого сотрудника.",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-700",
    cardAccent: "hover:border-violet-200 hover:shadow-violet-50",
  },
  {
    icon: Clock,
    title: "Умные напоминания",
    description:
      "Уведомления в Telegram или Slack за 15 минут до начала брони. Не пропустите ни одной встречи.",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    cardAccent: "hover:border-pink-200 hover:shadow-pink-50",
  },
  {
    icon: Star,
    title: "Аналитика использования",
    description:
      "Узнайте, какие переговорки самые популярные и в какое время. Оптимизируйте пространство на основе данных.",
    iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
    cardAccent: "hover:border-sky-200 hover:shadow-sky-50",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Возможности
          </div>
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Всё, что нужно для эффективной работы
          </h2>
          <p className="mt-4 text-lg text-zinc-500 max-w-xl mx-auto">
            SmartSpace объединяет карту офиса, систему бронирования и аналитику
            в одном удобном интерфейсе.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                className={`transition-all duration-200 hover:shadow-lg ${f.cardAccent}`}
              >
                <CardHeader>
                  <div
                    className={`h-10 w-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-4 shadow-sm`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Pricing CTA */
function PricingCta() {
  return (
    <section
      id="pricing"
      className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-4">
          Цены
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-6">
          Начните бесплатно
        </h2>
        <p className="text-lg text-indigo-100 mb-10">
          14 дней без ограничений. Потом — от 990 ₽/мес за команду. Без скрытых
          платежей.
        </p>
        <Link href="/map">
          <Button
            size="lg"
            className="bg-white text-indigo-700 font-semibold hover:bg-indigo-50 shadow-xl shadow-indigo-900/30 hover:shadow-2xl hover:shadow-indigo-900/40 transition-all duration-200"
          >
            Попробовать бесплатно
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Footer */
function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
          <div className="h-6 w-6 rounded-md bg-zinc-900 flex items-center justify-center">
            <Building2 size={12} className="text-white" />
          </div>
          SmartSpace
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["Документация", "API", "Конфиденциальность", "Условия"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                {link}
              </a>
            ),
          )}
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-400">
          © 2024 SmartSpace. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────── Page */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsRow />
      <FeaturesSection />
      <PricingCta />
      <Footer />
    </main>
  );
}
