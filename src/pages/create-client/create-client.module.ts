import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateClientPage } from './create-client';

@NgModule({
  declarations: [
    CreateClientPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CreateClientPage),
  ],
})
export class CreateClientPageModule {}
