import { useTranslation } from "react-i18next";

const SelettoreLingua = function () {
  const { i18n } = useTranslation();
  return (
    <select className="border rounded-5" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
      <option value="it">🇮🇹 ITALIANO</option>
      <option value="en">🇮🇸 ENGLISH</option>
      <option value="de">🇩🇪 DEUTSCH</option>
    </select>
  );
};

export default SelettoreLingua
