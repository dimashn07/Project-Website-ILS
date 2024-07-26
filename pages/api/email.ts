import { NextApiRequest, NextApiResponse } from 'next';
import { mailOptions, transporter } from 'config/nodemailer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { nama, jenisKelamin, whatsapp, email, jenisLayanan, kabupaten, puskesmas, keterangan } = req.body;
        if (!nama || !jenisKelamin || !whatsapp || !email || !jenisLayanan || !kabupaten || !puskesmas || !keterangan) {
            return res.status(400).json({ message: 'Bad Request: Missing required fields' });
        }
        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: `Layanan lampungsehat.org from ${nama}`,
                // text: 
                //     `Name: ${nama}
                //     \Jenis Kelamin: ${jenisKelamin}
                //     \nWhatsapp: ${whatsapp}
                //     \nEmail: ${email}
                //     \nJenis Layanan: ${jenisLayanan}
                //     \nKeterangan: ${keterangan}`,
                html: 
                  `<h1>Layanan Masyarakat</h1>
                  <p>Name: ${nama}</p>
                  <p>Jenis Kelamin: ${jenisKelamin}</p>
                  <p>Whatsapp: ${whatsapp}</p>
                  <p>Email: ${email}</p>
                  <p>Jenis Layanan: ${jenisLayanan}</p>
                  <p>Daerah: ${kabupaten}</p>
                  <p>Puskesmas: ${puskesmas}</p>
                  <p>Keterangan: ${keterangan}</p>`,
            });
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
        }
    }
    return res.status(400).json({ message: 'Bad Request' });
}

export default handler;
