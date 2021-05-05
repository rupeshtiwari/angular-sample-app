import { Approver } from './approver';
import { Facility } from './facility';


export interface SelectedApproverDialogData {
    approver:Approver;
    facilityName:string;
    facilityId :number;
    action:string;
    approverStructureId?:number;
}
