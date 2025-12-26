import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Home, Newspaper, Users, Settings } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Админ-панель новостной платформы",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
          <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Home size={20} />
                Dashboard
              </Link>

              <Link
                href="/news"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Newspaper size={20} />
                Новости
              </Link>

              <Link
                href="/users"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Users size={20} />
                Пользователи
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Settings size={20} />
                Настройки
              </Link>
            </nav>
          </aside>

          <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  );
}
