import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TijuanaComponent } from './tijuana/tijuana.component';
import { MeridaComponent } from './merida/merida.component';
import { CdmxComponent } from './cdmx/cdmx.component';
import { GdlComponent } from './gdl/gdl.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TijuanaComponent,
    MeridaComponent,
    CdmxComponent,
    GdlComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCG0Lm1OjmDt3U1kGam3DJIHy_NyZWsF2o',
        authDomain: 'redes-334503.firebaseapp.com',
        projectId: 'redes-334503',
        storageBucket: 'redes-334503.appspot.com',
        messagingSenderId: '125322440604',
        appId: '1:125322440604:web:da8d17437579c88958a259',
        measurementId: '${config.measurementId}',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
