import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { PlayerComponent } from './components/player/player.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PlayerModule } from './models/player/player.module';
import { PlayingCardModule } from './models/playing-card/playing-card.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    GameComponent,
    PlayerComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    FormsModule,
    PlayerModule,
    PlayingCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
