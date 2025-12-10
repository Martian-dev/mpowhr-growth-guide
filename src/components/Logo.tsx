import logoIcon from "@/assets/MpowHR_Logo.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      {/* Phoenix Icon */}
      <img src={logoIcon} alt="MpowHR Phoenix Logo" className="h-24 w-auto" />
    </div>
  );
}
