import Image from 'next/image';

export function LogoHeader() {
  return (
    <Image
      src="/logo-large.svg"
      alt="Quero Ler"
      width={200}
      height={60}
      priority
      className="mt-10 h-auto w-auto select-none mx-auto"
    />
  );
}
