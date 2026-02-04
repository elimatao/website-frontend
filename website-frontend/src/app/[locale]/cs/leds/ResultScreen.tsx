import { useTranslations } from "next-intl";

export default function ResultScreen({results, resetGame}: {results: {time: number; success: boolean;}[], resetGame: () => void}) {
    const t = useTranslations('LEDsGame');
    return (
        <>
            <div className="container mx-auto text-center p-6">
                <button onClick={resetGame} className="mx-auto px-6 py-2 mb-6 bg-gray-600 text-white rounded">
                    {t('return')}
                </button>
                <h2 className="text-2xl font-bold mb-6">{t('results_title')}</h2>
                <table className="w-full table-auto border-collapse shadow">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">{t('round')}</th>
                            <th className="border px-4 py-2">{t('time_taken')}</th>
                            <th className="border px-4 py-2">{t('result')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-accent' : ''}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{(result.time / 1000).toFixed(2)} s</td>
                                <td className="border px-4 py-2 text-center">
                                    {result.success ? (<span className="text-green-600 font-bold">{t('success')}</span>) : (<span className="text-red-600 font-bold">{t('failure')}</span>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}