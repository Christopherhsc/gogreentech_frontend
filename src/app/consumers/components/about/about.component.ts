import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  paragraphs: string[] = [
    'Gogreentech er bindeled mellem vores elnet og ejendomsejere – samtidig hjælper vi den grønne omstilling.',
    'Elnettet svinger konstant på 50 Hz – sker det ikke, får vi ustabilitet i vores elnet. Energinet skal konstant sikre, at vores elnet er i Balance. Når man producerer el med fossile brændstoffer, er det relativt nemt at skrue op og ned, så man hele tiden sikrer der er den korrekte strøm i nettet.',
    'Danmark 3x dobler vores produktion af vind og solenergi frem mod 2030. I fremtiden bliver det derfor sværere, at sikre der altid er den rette strøm, når vi har brug for den. Er der for lidt strøm er det et problem, er der for meget strøm - er dette også et problem.',
    'Gogreentech har de rette tekniske løsninger, til at balancere elnettet og vi binder ejendomsejere og Energinet sammen på en enkle måde.',
  ];
  currentParagraphIndex = 0;

  ngOnInit() {
    this.startParagraphRotation();
  }

  startParagraphRotation() {
    setInterval(() => {
      this.currentParagraphIndex =
        (this.currentParagraphIndex + 1) % this.paragraphs.length;
    }, 10000); // Change paragraph every 10 seconds
  }
}
