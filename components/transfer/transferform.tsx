'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function TransferForm() {
  const [form, setForm] = useState({
    to_name: '',
    to_email: '',
    sender_name: '',
    sender_account: '',
    amount: '',
    reference: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const templateParams = {
      to_name: form.to_name,
      to_email: form.to_email,
      sender_name: form.sender_name,
      sender_account: form.sender_account,
      amount: form.amount,
      reference: form.reference,
      transaction_date: new Date().toLocaleString('fr-FR'),
    }

    try {
    await emailjs.send(
  'service_nlf20zz',
  'template_ungho79',
  templateParams,
  'U6e0VGMH-de1vRKmc'
      )
      setSuccess(true)
    } catch (err) {
      setError('Erreur lors de l\'envoi. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Nouveau Virement
      </h2>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
          ✅ Virement envoyé ! Un email de confirmation a été envoyé.
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Nom du destinataire</label>
          <input
            name="to_name"
            value={form.to_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ex: Jean Dupont"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email du destinataire</label>
          <input
            name="to_email"
            type="email"
            value={form.to_email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="jean@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Votre nom</label>
          <input
            name="sender_name"
            value={form.sender_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ex: Marie Martin"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Votre numéro de compte</label>
          <input
            name="sender_account"
            value={form.sender_account}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="FR76 XXXX XXXX XXXX"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Montant (EUR)</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ex: 150"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Motif</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ex: Remboursement dîner"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le virement'}
        </button>
      </form>
    </div>
  )
}
