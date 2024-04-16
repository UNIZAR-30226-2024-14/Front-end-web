import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PokerComponent } from './components/poker/poker.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'blackjack',
    component: GameComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'poker',
    component: PokerComponent,
  },
  { // for test need to be delete in future.
    path: 'chat',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
