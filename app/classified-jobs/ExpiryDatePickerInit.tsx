'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import 'litepicker/dist/css/litepicker.css';
import dayjs from 'dayjs';

export default function DatePickerInit() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    const dateInput = document.getElementById('expiry-date-range') as HTMLInputElement;
    const startInput = document.getElementById('expiry-start-date') as HTMLInputElement;
    const endInput = document.getElementById('expiry-end-date') as HTMLInputElement;

    // Set initial values if present
    if (startParam && endParam) {
      dateInput.value = `${startParam} - ${endParam}`;
      startInput.value = startParam;
      endInput.value = endParam;
    }

    const target = document.getElementById('expiry-date-range');
    if (!target) return; 
    const Litepicker = require('litepicker').default;

    const picker = new Litepicker({
      element: document.getElementById('expiry-date-range'),
      singleMode: false,
      numberOfMonths: 2,
      numberOfColumns: 2,
      dropdowns: {
        minYear: 2022,
        maxYear: new Date().getFullYear(),
        months: true,
        years: true,
      },
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),// 🔒 disables future dates
      setup: (picker: any) => {
        picker.on('selected', (start: any, end: any) => {
          (document.getElementById('expiry-start-date') as HTMLInputElement).value = start.format('YYYY-MM-DD');
          (document.getElementById('expiry-end-date') as HTMLInputElement).value = end.format('YYYY-MM-DD');
        });

        picker.on('show', () => {
          const interval = setInterval(() => {
            const main = document.querySelector('.litepicker .container__main') as HTMLElement;
            if (!main || document.querySelector('.litepicker-shortcuts')) return;

            const shortcutContainer = document.createElement('div');
            shortcutContainer.className =
  'litepicker-shortcuts flex flex-wrap gap-2 p-3 text-sm bg-gray-100 border border-gray-300 rounded';

            const shortcuts = [
              { label: 'Today', range: [dayjs(), dayjs()] },
              { label: 'Yesterday', range: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
              { label: 'Last 7 Days', range: [dayjs().subtract(6, 'day'), dayjs()] },
              { label: 'This Month', range: [dayjs().startOf('month'), dayjs().endOf('month')] },
            ];

            shortcuts.forEach(({ label, range }) => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.textContent = label;
              btn.className =
                'bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition';
              btn.onclick = () => {
                const startStr = range[0].format('YYYY-MM-DD');
                const endStr = range[1].format('YYYY-MM-DD');
                picker.setDateRange(startStr, endStr);
                (document.getElementById('expiry-start-date') as HTMLInputElement).value = startStr;
                (document.getElementById('expiry-end-date') as HTMLInputElement).value = endStr;
              };
              shortcutContainer.appendChild(btn);
            });

            main.parentElement?.insertBefore(shortcutContainer, main);
            clearInterval(interval);
          }, 50); // retry until .container__main is rendered
        });
      },
    });
  }, []);

  return null;
}
