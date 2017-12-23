import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BresultadosPage } from '../pages/bresultados/bresultados';


import { EmailComposer } from '@ionic-native/email-composer';
import { SQLite } from '@ionic-native/sqlite';


import { DatabaseProvider } from '../providers/database/database'
import { HttpModule } from '@angular/http'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BresultadosPage

    //BlockCaclPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BresultadosPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    SQLite,
    DatabaseProvider,
    FileTransfer,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}