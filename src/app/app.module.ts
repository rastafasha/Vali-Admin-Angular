import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';


// Import Angular plugin.
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// paginacion
import {NgxPaginationModule} from 'ngx-pagination';

// Pipes
import { PipesModule } from './pipes/pipes.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageGalleryComponent } from './manage/manage-gallery/manage-gallery.component';
import { GalleryFormComponent } from './forms/gallery-form/gallery-form.component';
import { WaxFormComponent } from './servicios/wax-form/wax-form.component';
import { ManageWaxComponent } from './servicios/manage-wax/manage-wax.component';
import { ManagePermanentComponent } from './servicios/manage-permanent/manage-permanent.component';
import { PermanentFormComponent } from './servicios/permanent-form/permanent-form.component';
import { SpecialtFormComponent } from './servicios/specialt-form/specialt-form.component';
import { ManageSpecialtComponent } from './servicios/manage-specialt/manage-specialt.component';
import { ModalFormComponent } from './forms/modal-form/modal-form.component';
import { ManageModalComponent } from './manage/manage-modal/manage-modal.component';
import { ManageSpecialComponent } from './manage/manage-special/manage-special.component';
import { SpecialFormComponent } from './forms/special-form/special-form.component';
import { ManageContactComponent } from './manage/manage-contact/manage-contact.component';
import { ManageAntiageComponent } from './servicios/manage-antiage/manage-antiage.component';
import { AntiageFormComponent } from './servicios/antiage-form/antiage-form.component';
import { ManageRestorativeComponent } from './servicios/manage-restorative/manage-restorative.component';
import { RestorativeFormComponent } from './servicios/restorative-form/restorative-form.component';
import { CalmingFormComponent } from './servicios/calming-form/calming-form.component';
import { ManageCalmingComponent } from './servicios/manage-calming/manage-calming.component';
import { ManageBrighteningComponent } from './servicios/manage-brightening/manage-brightening.component';
import { BrighteningFormComponent } from './servicios/brightening-form/brightening-form.component';
import { SpecialfFormComponent } from './servicios/specialf-form/specialf-form.component';
import { ManageSpecialfComponent } from './servicios/manage-specialf/manage-specialf.component';
import { ManageLuxuryComponent } from './servicios/manage-luxury/manage-luxury.component';
import { LuxuryFormComponent } from './servicios/luxury-form/luxury-form.component';
import { HandFormComponent } from './servicios/hand-form/hand-form.component';
import { ManageHandComponent } from './servicios/manage-hand/manage-hand.component';
import { ManageSculptingComponent } from './servicios/manage-sculpting/manage-sculpting.component';
import { SculptingFormComponent } from './servicios/sculpting-form/sculpting-form.component';
import { WrappingFormComponent } from './servicios/wrapping-form/wrapping-form.component';
import { ManageWrappingComponent } from './servicios/manage-wrapping/manage-wrapping.component';
import { ManageLookComponent } from './servicios/manage-look/manage-look.component';
import { LookFormComponent } from './servicios/look-form/look-form.component';
import { BridalFormComponent } from './servicios/bridal-form/bridal-form.component';
import { ManageBridalComponent } from './servicios/manage-bridal/manage-bridal.component';
import { ManageClasesComponent } from './servicios/manage-clases/manage-clases.component';
import { ClasesFormComponent } from './servicios/clases-form/clases-form.component';
import { FaceFormComponent } from './servicios/face-form/face-form.component';
import { ManageFaceComponent } from './servicios/manage-face/manage-face.component';
import { ManageBodyComponent } from './servicios/manage-body/manage-body.component';
import { BodyFormComponent } from './servicios/body-form/body-form.component';
import { HypertrophicFormComponent } from './servicios/hypertrophic-form/hypertrophic-form.component';
import { ManageHypertrophicComponent } from './servicios/manage-hypertrophic/manage-hypertrophic.component';
import { UsersFormComponent } from './forms/users-form/users-form.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';
import { ManageWaxinfoComponent } from './paginas/manage-waxinfo/manage-waxinfo.component';
import { WaxinfoFormComponent } from './paginas/waxinfo-form/waxinfo-form.component';
import { RegistrosFormComponent } from './forms/registros-form/registros-form.component';
import { ManageRegistrosComponent } from './manage/manage-registros/manage-registros.component';

import { ShareThisComponent } from './share-this/share-this.component';

import { ShareButtonsModule } from '@ngx-share/buttons';
import { MembershipFormComponent } from './forms/membership-form/membership-form.component';
import { ManageMembershipComponent } from './manage/manage-membership/manage-membership.component';
import { ManageFinancingComponent } from './manage/manage-financing/manage-financing.component';
import { FormFinancingComponent } from './forms/form-financing/form-financing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DashboardComponent,
    ManageGalleryComponent,
    GalleryFormComponent,
    WaxFormComponent,
    ManageWaxComponent,
    ManagePermanentComponent,
    PermanentFormComponent,
    SpecialtFormComponent,
    ManageSpecialtComponent,
    ModalFormComponent,
    ManageModalComponent,
    ManageSpecialComponent,
    SpecialFormComponent,
    ManageContactComponent,
    ManageAntiageComponent,
    AntiageFormComponent,
    ManageRestorativeComponent,
    RestorativeFormComponent,
    CalmingFormComponent,
    ManageCalmingComponent,
    ManageBrighteningComponent,
    BrighteningFormComponent,
    SpecialfFormComponent,
    ManageSpecialfComponent,
    ManageLuxuryComponent,
    LuxuryFormComponent,
    HandFormComponent,
    ManageHandComponent,
    ManageSculptingComponent,
    SculptingFormComponent,
    WrappingFormComponent,
    ManageWrappingComponent,
    ManageLookComponent,
    LookFormComponent,
    BridalFormComponent,
    ManageBridalComponent,
    ManageClasesComponent,
    ClasesFormComponent,
    FaceFormComponent,
    ManageFaceComponent,
    ManageBodyComponent,
    BodyFormComponent,
    HypertrophicFormComponent,
    ManageHypertrophicComponent,
    UsersFormComponent,
    ManageUsersComponent,
    ManageWaxinfoComponent,
    WaxinfoFormComponent,
    RegistrosFormComponent,
    ManageRegistrosComponent,
    ShareThisComponent,
    MembershipFormComponent,
    ManageMembershipComponent,
    ManageFinancingComponent,
    FormFinancingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule,
    PipesModule,
    ShareButtonsModule.withConfig({
      debug: true
    })
  ],
  exports:[
    MenuComponent,
    HeaderComponent,
    FooterComponent
  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
