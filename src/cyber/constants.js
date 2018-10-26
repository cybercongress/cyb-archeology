export class TxType {
}

TxType.LINK = "link";
TxType.SEND = "send";

export class CyberdNetConfig {
}

CyberdNetConfig.MAXGAS = 200000;
CyberdNetConfig.PREFIX_BECH32_ACCADDR = "cosmos";
CyberdNetConfig.PREFIX_BECH32_ACCPUB = "cosmospub";
CyberdNetConfig.ENCODING_BECH32 = "bech32";
CyberdNetConfig.ENCODING_HEX = "hex";
CyberdNetConfig.DEFAULT_ENCODING = CyberdNetConfig.ENCODING_BECH32;

export class AminoKey {
}

AminoKey.BIP44Prefix = "44'/118'/";
AminoKey.FullFundraiserPath = AminoKey.BIP44Prefix + "0'/0/0";
