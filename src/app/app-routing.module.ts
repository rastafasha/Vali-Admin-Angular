import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';

// gallery

import { ManageGalleryComponent } from './manage/manage-gallery/manage-gallery.component';
import { GalleryFormComponent } from './forms/gallery-form/gallery-form.component';
import { ManageModalComponent } from './manage/manage-modal/manage-modal.component';
import { ModalFormComponent } from './forms/modal-form/modal-form.component';
import { ManageSpecialComponent } from './manage/manage-special/manage-special.component';
import { SpecialFormComponent } from './forms/special-form/special-form.component';

import { ManageContactComponent } from './manage/manage-contact/manage-contact.component';

import { ManageWaxComponent } from './servicios/manage-wax/manage-wax.component';
import { WaxFormComponent } from './servicios/wax-form/wax-form.component';

import { ManagePermanentComponent } from './servicios/manage-permanent/manage-permanent.component';
import { PermanentFormComponent } from './servicios/permanent-form/permanent-form.component';

import { ManageSpecialtComponent } from './servicios/manage-specialt/manage-specialt.component';
import { SpecialtFormComponent } from './servicios/specialt-form/specialt-form.component';


// Facial
import { AntiageFormComponent } from './servicios/antiage-form/antiage-form.component';
import { ManageAntiageComponent } from './servicios/manage-antiage/manage-antiage.component';
import { ManageRestorativeComponent } from './servicios/manage-restorative/manage-restorative.component';
import { RestorativeFormComponent } from './servicios/restorative-form/restorative-form.component';
import { CalmingFormComponent } from './servicios/calming-form/calming-form.component';
import { ManageCalmingComponent } from './servicios/manage-calming/manage-calming.component';
import { BrighteningFormComponent } from './servicios/brightening-form/brightening-form.component';
import { ManageBrighteningComponent } from './servicios/manage-brightening/manage-brightening.component';
import { SpecialfFormComponent } from './servicios/specialf-form/specialf-form.component';
import { ManageSpecialfComponent } from './servicios/manage-specialf/manage-specialf.component';
import { LuxuryFormComponent } from './servicios/luxury-form/luxury-form.component';
import { ManageLuxuryComponent } from './servicios/manage-luxury/manage-luxury.component';


// Body
import { HandFormComponent } from './servicios/hand-form/hand-form.component';
import { ManageHandComponent } from './servicios/manage-hand/manage-hand.component';
import { SculptingFormComponent } from './servicios/sculpting-form/sculpting-form.component';
import { ManageSculptingComponent } from './servicios/manage-sculpting/manage-sculpting.component';
import { WrappingFormComponent } from './servicios/wrapping-form/wrapping-form.component';
import { ManageWrappingComponent } from './servicios/manage-wrapping/manage-wrapping.component';

// Makeup
import { LookFormComponent } from './servicios/look-form/look-form.component';
import { ManageLookComponent } from './servicios/manage-look/manage-look.component';
import { BridalFormComponent } from './servicios/bridal-form/bridal-form.component';
import { ManageBridalComponent } from './servicios/manage-bridal/manage-bridal.component';
import { ClasesFormComponent } from './servicios/clases-form/clases-form.component';
import { ManageClasesComponent } from './servicios/manage-clases/manage-clases.component';

// Fibroblast
import { ManageFaceComponent } from './servicios/manage-face/manage-face.component';
import { FaceFormComponent } from './servicios/face-form/face-form.component';
import { ManageBodyComponent } from './servicios/manage-body/manage-body.component';
import { BodyFormComponent } from './servicios/body-form/body-form.component';
import { HypertrophicFormComponent } from './servicios/hypertrophic-form/hypertrophic-form.component';
import { ManageHypertrophicComponent } from './servicios/manage-hypertrophic/manage-hypertrophic.component';
import { UsersFormComponent } from './forms/users-form/users-form.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';

import { ManageWaxinfoComponent} from './paginas/manage-waxinfo/manage-waxinfo.component';
import { WaxinfoFormComponent } from './paginas/waxinfo-form/waxinfo-form.component';

import { ManageRegistrosComponent } from './manage/manage-registros/manage-registros.component';
import { RegistrosFormComponent} from './forms/registros-form/registros-form.component'
import { MembershipFormComponent } from './forms/membership-form/membership-form.component';
import { ManageMembershipComponent } from './manage/manage-membership/manage-membership.component';






const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  // Facial
  { path: 'antiage', canActivate: [AuthGuard], component: ManageAntiageComponent },
  { path: 'antiage/create', canActivate: [AuthGuard], component: AntiageFormComponent },
  { path: 'antiage/edit/:id',canActivate: [AuthGuard], component: AntiageFormComponent },
  { path: 'restorative',canActivate: [AuthGuard], component: ManageRestorativeComponent },
  { path: 'restorative/create',canActivate: [AuthGuard], component: RestorativeFormComponent },
  { path: 'restorative/edit/:id',canActivate: [AuthGuard], component: RestorativeFormComponent },
  { path: 'calming',canActivate: [AuthGuard], component: ManageCalmingComponent },
  { path: 'calming/create',canActivate: [AuthGuard], component: CalmingFormComponent },
  { path: 'calming/edit/:id',canActivate: [AuthGuard], component: CalmingFormComponent },
  { path: 'brightening',canActivate: [AuthGuard], component: ManageBrighteningComponent },
  { path: 'brightening/create',canActivate: [AuthGuard], component: BrighteningFormComponent },
  { path: 'brightening/edit/:id',canActivate: [AuthGuard], component: BrighteningFormComponent },
  { path: 'specialf',canActivate: [AuthGuard], component: ManageSpecialfComponent },
  { path: 'specialf/create',canActivate: [AuthGuard], component: SpecialfFormComponent },
  { path: 'specialf/edit/:id',canActivate: [AuthGuard], component: SpecialfFormComponent },
  { path: 'luxuring',canActivate: [AuthGuard], component: ManageLuxuryComponent },
  { path: 'luxuring/create',canActivate: [AuthGuard], component: LuxuryFormComponent },
  { path: 'luxuring/edit/:id',canActivate: [AuthGuard], component: LuxuryFormComponent },
  // body
  { path: 'hand',canActivate: [AuthGuard], component: ManageHandComponent },
  { path: 'hand/create',canActivate: [AuthGuard], component: HandFormComponent },
  { path: 'hand/edit/:id',canActivate: [AuthGuard], component: HandFormComponent },
  { path: 'sculpting',canActivate: [AuthGuard], component: ManageSculptingComponent },
  { path: 'sculpting/create',canActivate: [AuthGuard], component: SculptingFormComponent },
  { path: 'sculpting/edit/:id',canActivate: [AuthGuard], component: SculptingFormComponent },
  { path: 'wrapping',canActivate: [AuthGuard], component: ManageWrappingComponent },
  { path: 'wrapping/create',canActivate: [AuthGuard], component: WrappingFormComponent },
  { path: 'wrapping/edit/:id',canActivate: [AuthGuard], component: WrappingFormComponent },
  // makeup
  { path: 'look',canActivate: [AuthGuard], component: ManageLookComponent },
  { path: 'look/create',canActivate: [AuthGuard], component: LookFormComponent },
  { path: 'look/edit/:id',canActivate: [AuthGuard], component: LookFormComponent },
  { path: 'bridal',canActivate: [AuthGuard], component: ManageBridalComponent },
  { path: 'bridal/create',canActivate: [AuthGuard], component: BridalFormComponent },
  { path: 'bridal/edit/:id',canActivate: [AuthGuard], component: BridalFormComponent },
  { path: 'clases',canActivate: [AuthGuard], component: ManageClasesComponent },
  { path: 'clases/create',canActivate: [AuthGuard], component: ClasesFormComponent },
  { path: 'clases/edit/:id',canActivate: [AuthGuard], component: ClasesFormComponent },
  // fribroblast
  { path: 'face',canActivate: [AuthGuard], component: ManageFaceComponent },
  { path: 'face/create',canActivate: [AuthGuard], component: FaceFormComponent },
  { path: 'face/edit/:id',canActivate: [AuthGuard], component: FaceFormComponent },
  { path: 'body',canActivate: [AuthGuard], component: ManageBodyComponent },
  { path: 'body/create',canActivate: [AuthGuard], component: BodyFormComponent },
  { path: 'body/edit/:id',canActivate: [AuthGuard], component: BodyFormComponent },
  { path: 'hypertrophic',canActivate: [AuthGuard], component: ManageHypertrophicComponent },
  { path: 'hypertrophic/create',canActivate: [AuthGuard], component: HypertrophicFormComponent },
  { path: 'hypertrophic/edit/:id',canActivate: [AuthGuard], component: HypertrophicFormComponent },

  { path: 'wax',canActivate: [AuthGuard], component: ManageWaxComponent },
  { path: 'wax/create',canActivate: [AuthGuard], component: WaxFormComponent },
  { path: 'wax/edit/:id',canActivate: [AuthGuard], component: WaxFormComponent },
  { path: 'permanent',canActivate: [AuthGuard], component: ManagePermanentComponent },
  { path: 'permanent/create',canActivate: [AuthGuard], component: PermanentFormComponent },
  { path: 'permanent/edit/:id',canActivate: [AuthGuard], component: PermanentFormComponent },
  { path: 'specialt',canActivate: [AuthGuard], component: ManageSpecialtComponent },
  { path: 'specialt/create',canActivate: [AuthGuard], component: SpecialtFormComponent },
  { path: 'specialt/edit/:id',canActivate: [AuthGuard], component: SpecialtFormComponent },
  // gallery
  { path: 'gallery',canActivate: [AuthGuard], component: ManageGalleryComponent },
  { path: 'gallery/create',canActivate: [AuthGuard], component: GalleryFormComponent },
  { path: 'gallery/edit/:id',canActivate: [AuthGuard], component: GalleryFormComponent },
  { path: 'modal',canActivate: [AuthGuard], component: ManageModalComponent },
  { path: 'modal/create',canActivate: [AuthGuard], component: ModalFormComponent },
  { path: 'modal/edit/:id',canActivate: [AuthGuard], component: ModalFormComponent },
  { path: 'promos',canActivate: [AuthGuard], component: ManageSpecialComponent },
  { path: 'promos/create',canActivate: [AuthGuard], component: SpecialFormComponent },
  { path: 'promos/edit/:id',canActivate: [AuthGuard], component: SpecialFormComponent },
  // Contact
  { path: 'contact',canActivate: [AuthGuard], component: ManageContactComponent },
  { path: 'users',canActivate: [AuthGuard], component: ManageUsersComponent },
  { path: 'users/create',canActivate: [AuthGuard], component: UsersFormComponent },
  { path: 'users/edit/:id',canActivate: [AuthGuard], component: UsersFormComponent },
  //
  { path: 'subcriptores',canActivate: [AuthGuard], component: ManageRegistrosComponent },
  { path: 'subcriptores/create',canActivate: [AuthGuard], component: RegistrosFormComponent },
  { path: 'subcriptores/edit/:id',canActivate: [AuthGuard], component: RegistrosFormComponent },

  // paginas
  { path: 'waxinfo',canActivate: [AuthGuard], component: ManageWaxinfoComponent },
  { path: 'waxinfo/create',canActivate: [AuthGuard], component: WaxinfoFormComponent },
  { path: 'waxinfo/edit/:id',canActivate: [AuthGuard], component: WaxinfoFormComponent },
  
  { path: 'pages',canActivate: [AuthGuard], component: ManageMembershipComponent },
  { path: 'pages/edit/:id',canActivate: [AuthGuard], component: MembershipFormComponent },

  { path: '**', redirectTo: '/admin', pathMatch: 'full' }
];








@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
