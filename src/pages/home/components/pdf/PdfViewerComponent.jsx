import { useEffect, useRef } from 'react';

export default function PdfViewerComponent(props) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        let PSPDFKit;
        (async function () {
            PSPDFKit = await import('pspdfkit');
            await PSPDFKit.load({
                container,
                document: 'tk.pdf',
                baseUrl: `${window.location.protocol}//${
                    window.location.host
                }/${import.meta.env.PUBLIC_URL ?? ''}`,
            });
        })();

        return () => PSPDFKit && PSPDFKit.unload(container);
    }, [props]);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100vh' }}
        />
    );
}