export interface Approver {
  approverId: number;
  level: number;
  name?: string;
  facilityId?: number;
  minimumCost: number;
  approverStructureId?: number;
}
