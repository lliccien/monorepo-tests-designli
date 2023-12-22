import { Expose, Transform } from 'class-transformer';

export class TransformedRecord {
  @Expose()
  @Transform(({ obj }) => obj?.ses?.receipt?.spamVerdict?.status === 'PASS')
  spam: boolean;

  @Expose()
  @Transform(({ obj }) => obj?.ses?.receipt?.virusVerdict?.status === 'PASS')
  virus: boolean;

  @Expose()
  @Transform(({ obj }) => {
    // const { spfVerdict, dkimVerdict, dmarcVerdict } = obj?.ses?.receipt?;
    return (
      obj?.ses?.receipt?.spfVerdict?.status === 'PASS' &&
      obj?.ses?.receipt?.dkimVerdict?.status === 'PASS' &&
      obj?.ses?.receipt?.dmarcVerdict?.status === 'PASS'
    );
  })
  dns: boolean;

  @Expose()
  @Transform(({ obj }) => {
    const date = new Date(obj?.ses?.mail?.timestamp);
    return date.toLocaleString('es-ES', { month: 'long' });
  })
  mes: string;

  @Expose()
  @Transform(({ obj }) => obj?.ses?.receipt?.processingTimeMillis > 1000)
  retrasado: boolean;

  @Expose()
  @Transform(({ obj }) => obj?.ses?.mail?.source?.split('@')[0])
  emisor: string;

  @Expose()
  @Transform(
    ({ obj }) =>
      obj?.ses?.mail?.destination?.map((email) => email.split('@')[0]),
  )
  receptor: string[];
}
