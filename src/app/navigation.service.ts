export class NavigationService {
  currentStep = 4;

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
}
