import {Label} from '@/components/base/label';
import {useMemo} from 'preact/hooks';

export function ZoomIndicator({zoom}: {zoom: number}) {
  const zoomPercent = useMemo(() => {
    return Math.round(zoom * 100);
  }, [zoom]);
  return <Label title="Масштаб">{zoomPercent}%</Label>;
}
