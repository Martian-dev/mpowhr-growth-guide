import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUDIENCES, type ContactDetails } from "../../../shared/posh";

export const AudienceField = ({
  value,
  onChange,
  prefix,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  prefix: string;
  disabled?: boolean;
}) => (
  <fieldset disabled={disabled} className="space-y-2">
    <legend className="mb-3 text-sm font-medium">
      Which best describes you?
    </legend>
    {AUDIENCES.map((a) => (
      <label
        key={a}
        className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${value === a ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"}`}
      >
        <input
          type="radio"
          required
          name={`${prefix}-audience`}
          value={a}
          checked={value === a}
          onChange={() => onChange(a)}
          className="h-4 w-4 accent-[#0F3257]"
        />
        {a}
      </label>
    ))}
  </fieldset>
);
const AttendeeFields = ({
  value,
  onChange,
  prefix,
  disabled = false,
}: {
  value: ContactDetails;
  onChange: (value: ContactDetails) => void;
  prefix: string;
  disabled?: boolean;
}) => (
  <fieldset disabled={disabled} className="space-y-4">
    {(["name", "email", "phone"] as const).map((field) => (
      <div className="space-y-2" key={field}>
        <Label htmlFor={`${prefix}-${field}`}>
          {field === "name"
            ? "Full name"
            : field === "email"
              ? "Email address"
              : "Phone number"}
        </Label>
        <Input
          id={`${prefix}-${field}`}
          type={
            field === "phone" ? "tel" : field === "email" ? "email" : "text"
          }
          autoComplete={`section-${prefix} ${field === "phone" ? "tel" : field}`}
          required
          maxLength={field === "name" ? 100 : field === "email" ? 254 : 25}
          value={value[field]}
          onChange={(e) => onChange({ ...value, [field]: e.target.value })}
          className="min-h-12"
        />
      </div>
    ))}
    <p className="text-xs leading-relaxed text-slate-500">
      Include the country code for numbers outside India.
    </p>
  </fieldset>
);
export default AttendeeFields;
