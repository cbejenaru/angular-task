export class NavigationService {
  currentStep = 1;

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}
