import { initRoutePlanner } from './routePlanner';
import { initActivities } from './activities';
import { initAttendance } from './attendance';
import { initDriverSurvey } from './driverSurvey';
import { initDemoRequest, initContactSection } from './demoRequest';
import { initRouteCheck } from './routeCheck';
import { initVehicleTracking } from './vehicleTracking';
import { initParentNotifications } from './parentNotifications';
import { initReporting } from './reporting';

function initTabSystem(): void {
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.sp-tab-btn');
  const tabPanels = document.querySelectorAll<HTMLElement>('.sp-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (!target) return;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

function init(): void {
  initTabSystem();
  initRoutePlanner();
  initActivities();
  initAttendance();
  initDriverSurvey();
  initDemoRequest();
  initContactSection();
  initRouteCheck();
  initVehicleTracking();
  initParentNotifications();
  initReporting();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
