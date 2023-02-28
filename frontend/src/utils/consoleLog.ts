import { development } from '@/constants/config';

// console.log('Object:', JSON.stringify(obj, null, 4));

interface ConsoleLog {
  (title: string, message: string): void;
}

const consoleLog: ConsoleLog = (title, message) => {
  if (development)
    console.log(
      `%c${title}:`,
      `background: #000; color: #C0FFEE;`,
      '\n',
      message
    );
};

export default consoleLog;
