export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-zinc-600 dark:text-zinc-400">
        Добро пожаловать в админку. Выберите раздел слева.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Новости</h2>
          <p className="text-sm text-zinc-500">Управление новостями</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Пользователи</h2>
          <p className="text-sm text-zinc-500">Управление пользователями</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Настройки</h2>
          <p className="text-sm text-zinc-500">Конфигурация платформы</p>
        </div>
      </div>
    </div>
  );
}
