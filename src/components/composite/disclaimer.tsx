"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";

export default function Disclaimer() {
  return (
    <div className="p-6  my-2 mx-4 text-sm w-[450px] rounded-lg bg-blue-100">
      <div className="flex mb-4">
        <AlertTriangle className="mr-2 text-orange-300" />
        <h2 className="text-2xl text-orange-300">Disclaimer</h2>
      </div>
      <div className="mb-4">By using this service, you hereby consent to the following:</div>

      <ol className="list-decimal pl-4">
        <li className="pb-3">
          <strong>Camera Permission:</strong> You grant permission to access and utilize your device's camera for the purpose of recording video.
        </li>
        <li className="pb-3">
          <strong>Video Recording:</strong> You acknowledge that the service may capture video footage, and you consent to the recording of video during your interaction.
        </li>
        <li className="pb-3">
          <strong>Analytical Processing:</strong> You agree that the recorded video may be processed for analytical purposes. This may include, but is not limited to, evaluating user experience, improving service quality, and conducting research to enhance our offerings.
        </li>
      </ol>
      <p className="mb-4">
        Your privacy is important to us, and we assure you that all recorded data will be treated with the utmost confidentiality and used solely for the stated purposes. If you have any concerns or questions regarding this consent, please contact our support team.
      </p>
      <p>
        Thank you for your understanding and cooperation.
      </p>
    </div>);
}
