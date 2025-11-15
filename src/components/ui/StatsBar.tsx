interface StatsBarProps {
  total: number;
  publicCount: number;
  privateCount: number;
  selectedCount: number;
}

export const StatsBar = ({
  total,
  publicCount,
  privateCount,
  selectedCount,
}: StatsBarProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total Repos</div>
      </div>
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {publicCount}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Public</div>
      </div>
      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {privateCount}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Private</div>
      </div>
      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{selectedCount}</div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Selected</div>
      </div>
    </div>
  );
};
