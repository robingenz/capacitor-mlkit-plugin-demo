import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Language, Translation } from '@capacitor-mlkit/translation';

@Component({
  selector: 'app-mlkit-translation',
  templateUrl: './mlkit-translation.page.html',
  styleUrls: ['./mlkit-translation.page.scss'],
})
export class MlkitTranslationPage {
  public readonly language = Language;
  public translateFormGroup = new UntypedFormGroup({
    text: new UntypedFormControl(''),
    sourceLanguage: new UntypedFormControl(Language.English),
    targetLanguage: new UntypedFormControl(Language.German),
    translatedText: new UntypedFormControl(''),
  });
  public manageModelsFormGroup = new UntypedFormGroup({
    language: new UntypedFormControl(Language.English),
  });

  private readonly githubUrl = 'https://github.com/robingenz/capacitor-mlkit';

  constructor() {}

  public openOnGithub(): void {
    window.open(this.githubUrl, '_blank');
  }

  public async translate(): Promise<void> {
    const text = this.translateFormGroup.get('text')?.value;
    const sourceLanguage = this.translateFormGroup.get('sourceLanguage')?.value;
    const targetLanguage = this.translateFormGroup.get('targetLanguage')?.value;
    if (!text || !sourceLanguage || !targetLanguage) {
      return;
    }
    const result = await Translation.translate({
      text,
      sourceLanguage,
      targetLanguage,
    });
    this.translateFormGroup.patchValue({ translatedText: result.text });
  }

  public async deleteDownloadedModel(): Promise<void> {
    const language = this.manageModelsFormGroup.get('language')?.value;
    if (!language) {
      return;
    }
    await Translation.deleteDownloadedModel({ language });
  }
}
