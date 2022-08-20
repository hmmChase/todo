import { development } from '@/constants/config';

interface ColoredLog {
  (title: string, message?: string, color?: string): void;
}

const coloredLog: ColoredLog = (title, message, color) => {
  if (development)
    console.log(
      `%c${title}:`,
      `background: #000; color: ${color ? color : '#FFF'};`,
      '\n',
      message
    );
};

export default coloredLog;
