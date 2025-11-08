import { FormFieldHolder } from "../FormFieldHolder";
import { FormInput } from "../FormInput";

const paymentTermsOptions = [
  "Full payment upfront",
  "50% initial deposit, balance on handover",
  "Two installments allowed",
  "Three installments over 3 months",
  "Quarterly payment plan",
  "Bi-annual payment option",
  "Monthly payments accepted",
  "Annual advance payment required",
  "Pay 60% now, 40% on completion",
  "Pay 70% now, 30% upon move-in",
  "Flexible payment schedule (upon agreement)",
  "Payment due before inspection",
  "Payment after inspection approval",
  "3-month payment plan available",
  "6-month installment plan available",
  "12-month payment plan",
  "24-month payment plan",
  "Pay per milestone (construction-based)",
  "Rent-to-own plan available",
  "Lease with purchase option",
  "Cooperative payment scheme accepted",
  "Outright purchase only",
  "Bank financing supported",
  "Mortgage plan available",
  "Payment through Inspectra only",
  "Agency commission due on payment confirmation",
  "Legal fees due before tenancy agreement signing",
  "Initial deposit required to secure property",
  "Refundable deposit required before handover",
  "Payment terms negotiable",
  "Custom Payment Terms",
];

export default function PropertyFeesAndTerms() {
  return (
    <>
      <h2 className="mt-20 mb-5 heading-2">Fees & Terms</h2>
      <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
        <FormFieldHolder
          label={
            <span>
              Base Price <span className="text-emerald-400">₦200</span>
            </span>
          }
          error={"Check Error"}
        >
          <FormInput
            disabled={false}
            id="base-price"
            placeholder="Enter base price"
            type="number"
          />
        </FormFieldHolder>
        <FormFieldHolder label="Payment Terms" error="Check Error">
          <select className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-800">
            {paymentTermsOptions.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </FormFieldHolder>
      </div>
    </>
  );
}
