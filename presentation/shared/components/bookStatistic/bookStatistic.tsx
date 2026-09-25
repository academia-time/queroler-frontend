import { ReactNode } from 'react';

export interface BookStatisticProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  numero: number;
  numeroAvaliacoes?: number;
}

export function BookStatistic({
  title,
  icon,
  iconColor,
  numero,
  numeroAvaliacoes,
}: BookStatisticProps) {
  return (
    <div className="w-full h-full lg:h-auto mmin-h-10 lg:min-h-32 lg:w-auto min-w-0 lg:min-w-55 lg:min-w-55 bg-card-bg border border-border rounded-lg px-4 lg:p-6 py-3 lg:py-4">
      <div className="flex justify-center mb-4">
        <div className={`${iconColor} flex items-center gap-2`}>
          {icon}
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            {title}
          </span>
        </div>
      </div>

      <div className="flex justify-center text-xl lg:text-xl">{numero}</div>

      {title === 'Avaliação' && numeroAvaliacoes && (
        <div className="text-text-primary text-xs lg:text-sm pt-4">
          {numeroAvaliacoes} avaliações
        </div>
      )}
    </div>
  );
}
