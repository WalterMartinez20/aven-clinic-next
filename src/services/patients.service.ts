class PatientsService {
  /**
   * Fetches the list of all patients.
   */
  async getPatients(): Promise<any[]> {
    try {
      const res = await fetch("/api/patients");
      if (!res.ok) throw new Error("Failed to fetch patients");
      return res.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  /**
   * Creates a new patient.
   */
  async createPatient(data: any): Promise<any> {
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create patient");
      return res.json();
    } catch (error) {
      console.error("Error creating patient:", error);
      throw error;
    }
  }

  /**
   * Updates an existing patient.
   */
  async updatePatient(id: string, data: any): Promise<any> {
    try {
      // Future endpoint: `/api/patients/${id}`
      console.log(`Simulating update for patient ${id}`, data);
      return { success: true, data };
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  }

  /**
   * Deletes a patient.
   */
  async deletePatient(id: string): Promise<any> {
    try {
      // Future endpoint: `/api/patients/${id}`
      console.log(`Simulating delete for patient ${id}`);
      return { success: true };
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  }
}

export const patientsService = new PatientsService();
