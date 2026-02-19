import type { DemoRequest } from './types';
import { $, showToast } from './utils';

export function initDemoRequest(): void {
  const form = $('#demoRequestForm') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data: DemoRequest = {
      fullName: fd.get('demoName') as string,
      email: fd.get('demoEmail') as string,
      phone: fd.get('demoPhone') as string,
      company: fd.get('demoCompany') as string,
      studentCount: fd.get('demoStudentCount') as string,
      serviceType: fd.get('demoServiceType') as string,
      message: fd.get('demoMessage') as string,
    };
    console.log('Demo talebi:', data);
    showToast('Demo talebiniz alındı! Ekibimiz en kısa sürede sizinle iletişime geçecek.', 'success');
    form.reset();
  });
}

export function initContactSection(): void {
  const mapContainer = $('#contactMapContainer');
  if (mapContainer && !mapContainer.querySelector('iframe')) {
    mapContainer.innerHTML = `
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.6!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
        width="100%" height="250" style="border:0;border-radius:10px;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
  }
}
