import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultatComponent } from './components/resultat/resultat.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',component: AccueilComponent},
    {path:'historique', component: HistoriqueComponent},
    {path:'quiz', component: QuizComponent},
    {path:'resultat', component: ResultatComponent}
];
