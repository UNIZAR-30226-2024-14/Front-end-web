import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { PokerComponent } from './components/poker/poker.component';
import { ChatComponent } from './components/chat/chat.component';
import { BlackjackModule } from './components/blackjack/blackjack.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PokerCardComponent } from "./components/poker/poker-card/poker-card.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        SignupComponent,
        BlackjackComponent,
        PokerComponent,
        ChatComponent,
    ],
    providers: [provideAnimationsAsync()],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BlackjackModule,
        MatSnackBarModule,
        FormsModule,
        PokerCardComponent
    ]
})
export class AppModule {}
