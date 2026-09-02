import {
  blockQuote,
  bold,
  channelMention,
  codeBlock,
  ContextMenuCommandBuilder,
  formatEmoji,
  hideLinkEmbed,
  hyperlink,
  inlineCode,
  italic,
  quote,
  roleMention,
  SlashCommandBuilder,
  spoiler,
  strikethrough,
  time,
  TimestampStyles,
  TimestampStylesString,
  underscore,
  userMention,
} from '@discordjs/builders';
import { Collection } from '@discordjs/collection';
import {
  APIActionRowComponent,
  APIApplicationCommandInteractionData,
  APIApplicationCommandOption,
  APIApplicationCommandPermission,
  APIAuditLogChange,
  APIButtonComponent,
  APIEmbed,
  APIEmoji,
  APIInteractionDataResolvedChannel,
  APIInteractionDataResolvedGuildMember,
  APIInteractionGuildMember,
  APIMessage,
  APIMessageActionRowComponent,
  APIMessageComponent,
  APIModalActionRowComponent,
  APIOverwrite,
  APIPartialChannel,
  APIPartialEmoji,
  APIPartialGuild,
  APIRole,
  APISelectMenuComponent,
  APITemplateSerializedSourceGuild,
  APIUser,
  GatewayVoiceServerUpdateDispatchData,
  GatewayVoiceStateUpdateDispatchData,
  MessageActivityType,
  RESTPostAPIApplicationCommandsJSONBody,
  Snowflake,
  LocalizationMap,
  LocaleString,
  APIGuildMember,
  APIChannel,
  TeamMemberRole,
  APIPoll,
  APIPollAnswer,
  GuildScheduledEventRecurrenceRuleWeekday,
  GuildScheduledEventRecurrenceRuleMonth,
  GuildScheduledEventRecurrenceRuleFrequency,
  APIChatInputApplicationCommandInteractionData,
  APIContextMenuInteractionData,
  ReactionType,
  VoiceChannelEffectSendAnimationType,
  GatewayVoiceChannelEffectSendDispatchData,
} from 'discord-api-types/v10';
import { ChildProcess, ChildProcessWithoutNullStreams } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { AgentOptions } from 'node:https';
import { Response, ProxyAgent } from 'undici';
import { Readable, Writable, Stream } from 'node:stream';
import { MessagePort, Worker } from 'node:worker_threads';
import { authenticator } from 'otplib';
import { CookieJar } from 'tough-cookie';
import { RtpPacket } from 'werift-rtp';
import * as WebSocket from 'ws';
import {
  ActivityTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  AutoModerationActionTypes,
  AutoModerationRuleEventTypes,
  AutoModerationRuleKeywordPresetTypes,
  AutoModerationRuleTriggerTypes,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  InteractionResponseTypes,
  InteractionTypes,
  InviteTargetTypes,
  MembershipStates,
  MessageButtonStyles,
  MessageComponentTypes,
  MessageComponentInteractables,
  MessageTypes,
  MFALevels,
  NSFWLevels,
  OverwriteTypes,
  PremiumTiers,
  PrivacyLevels,
  StickerFormatTypes,
  StickerTypes,
  TextInputStyles,
  VerificationLevels,
  WebhookTypes,
  GuildScheduledEventEntityTypes,
  GuildScheduledEventStatuses,
  GuildScheduledEventPrivacyLevels,
  VideoQualityModes,
  SortOrderTypes,
  ForumLayoutTypes,
  ApplicationRoleConnectionMetadataTypes,
  RelationshipTypes,
  SelectMenuComponentTypes,
  InviteTypes,
  PollLayoutTypes,
  ReactionTypes,
  MessageReferenceTypes,
  SeparatorSpacingSizes,
  ApplicationType,
  NameplatePalette,
} from './enums';
import {
  APIApplicationRoleConnectionMetadata,
  APIAutoModerationRule,
  GatewayAutoModerationActionExecutionDispatchData,
  RawActivityData,
  RawAnonymousGuildData,
  RawApplicationCommandData,
  RawApplicationData,
  RawBaseGuildData,
  RawChannelData,
  RawDMChannelData,
  RawEmojiData,
  RawGuildAuditLogData,
  RawGuildAuditLogEntryData,
  RawGuildBanData,
  RawGuildChannelData,
  RawGuildData,
  RawGuildEmojiData,
  RawGuildMemberData,
  RawGuildPreviewData,
  RawGuildScheduledEventData,
  RawGuildTemplateData,
  RawIntegrationApplicationData,
  RawIntegrationData,
  RawInteractionData,
  RawInviteData,
  RawInviteGuildData,
  RawInviteStageInstance,
  RawMessageAttachmentData,
  RawMessageButtonInteractionData,
  RawMessageComponentInteractionData,
  RawMessageData,
  RawMessagePayloadData,
  RawMessageReactionData,
  RawMessageSelectMenuInteractionData,
  RawModalSubmitInteractionData,
  RawOAuth2GuildData,
  RawPartialGroupDMChannelData,
  RawPartialMessageData,
  RawPermissionOverwriteData,
  RawPresenceData,
  RawReactionEmojiData,
  RawRichPresenceAssets,
  RawRoleData,
  RawStageInstanceData,
  RawStickerData,
  RawStickerPackData,
  RawTeamData,
  RawTeamMemberData,
  RawTextInputComponentData,
  RawThreadChannelData,
  RawThreadMemberData,
  RawTypingData,
  RawUserData,
  RawVoiceRegionData,
  RawVoiceStateData,
  RawWebhookData,
  RawWelcomeChannelData,
  RawWelcomeScreenData,
  RawWidgetData,
  RawWidgetMemberData,
  APIUnfurledMediaItem,
  APIContainerComponent,
  APIFileComponent,
  APISectionComponent,
  APISeparatorComponent,
  APIThumbnailComponent,
  APITextDisplayComponent,
  APIMediaGalleryComponent,
  APIMediaGalleryItem,
} from './rawDataTypes';
import { Socket } from 'node:dgram';

type Buffer = any;

//#region Classes

// RPC by aiko-chan-ai
export interface RichButton {
  name: string;
  url: string;
}

export class RichPresence extends Activity {
  public constructor(client: Client, data?: object);
  public metadata: RichPresenceMetadata;
  public setAssetsLargeImage(image?: string): this;
  public setAssetsLargeText(text?: string): this;
  public setAssetsSmallImage(image?: string): this;
  public setAssetsSmallText(text?: string): this;
  public setName(name?: string): this;
  public setURL(url?: string): this;
  public setType(type?: ActivityType): this;
  public setApplicationId(id?: Snowflake): this;
  public setDetails(details?: string): this;
  public setState(state?: string): this;
  public setParty(party?: { max: number; current: number; id?: string }): this;
  public setStartTimestamp(timestamp: Date | number | null): this;
  public setEndTimestamp(timestamp: Date | number | null): this;
  public setButtons(...button: RichButton[]): this;
  public addButton(name: string, url: string): this;
  public setJoinSecret(join?: string): this;
  public setPlatform(platform?: ActivityPlatform): this;
  public static getExternal(client: Client, applicationId: Snowflake, ...images: string[]): Promise<ExternalAssets[]>;
}

export class DiscordAuthWebsocket extends EventEmitter {
  constructor();
  public token: string;
  public readonly user: {
    id: Snowflake;
    username: string;
    discriminator: number;
    avatar: string;
  };
  public readonly exprire: Date;
  public readonly AuthURL: string;
  public connect(client?: Client): Promise<void>;
  public destroy(): void;
  public generateQR(): void;
  public on(event: 'ready', listener: (client: this) => void): this;
  public on(event: 'finish', listener: (token: string) => void): this;
  public on(event: 'cancel' | 'pending', listener: (user: RawUserData) => void): this;
  public on(event: 'closed', listener: () => void): this;
  public on(event: string, listener: (...args: any[]) => Awaitable<void>): this;
}

export interface ExternalAssets {
  url: string;
  external_asset_path: string;
}

export interface RichPresenceMetadata {
  album_id?: string;
  artist_ids?: string[];
  context_uri?: string;
  button_urls?: string[];
}

export class SpotifyRPC extends RichPresence {
  public constructor(client: Client, data?: object);
  public setSongId(id: string): this;
  public addArtistId(id: string): this;
  public setArtistIds(...ids: string[]): this;
  public setAlbumId(id: string): this;
}

export class CustomStatus extends Activity {
  public constructor(client: Client, data?: object);
  public setEmoji(emoji?: EmojiIdentifierResolvable): this;
  public setState(state: string): this;
}

export class Activity {
  public constructor(presence: Presence, data?: RawActivityData);
  public readonly presence: Presence;
  public applicationId: Snowflake | null;
  public assets: RichPresenceAssets;
  public buttons: string[];
  public readonly createdAt: Date;
  public createdTimestamp: number;
  public details: string | null;
  public emoji: EmojiIdentifierResolvable | null;
  public flags: Readonly<ActivityFlags>;
  public id: string;
  public name: string;
  public party: {
    id: string | null;
    size: [number, number];
  } | null;
  public platform: ActivityPlatform | null;
  public sessionId: string | null;
  public state: string | null;
  public syncId: string | null;
  public timestamps: {
    start: number | null;
    end: number | null;
  } | null;
  public type: ActivityType;
  public url: string | null;
  public equals(activity: Activity): boolean;
  public toJSON(): ActivityOptions;
  public toString(): string;
}

export class ActivityFlags extends BitField<ActivityFlagsString> {
  public static FLAGS: Record<ActivityFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<ActivityFlagsString, number>): number;
}

export class PurchasedFlags extends BitField<PurchasedFlagsString> {
  public static FLAGS: Record<PurchasedFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<PurchasedFlagsString, number>): number;
}

export class PremiumUsageFlags extends BitField<PremiumUsageFlagsString> {
  public static FLAGS: Record<PremiumUsageFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<PremiumUsageFlagsString, number>): number;
}

export class InviteFlags extends BitField<InviteFlagsString> {
  public static FLAGS: Record<InviteFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<InviteFlagsString, number>): number;
}

export abstract class AnonymousGuild extends BaseGuild {
  protected constructor(client: Client, data: RawAnonymousGuildData, immediatePatch?: boolean);
  public banner: string | null;
  public description: string | null;
  public nsfwLevel: NSFWLevel;
  public premiumSubscriptionCount: number | null;
  public splash: string | null;
  public vanityURLCode: string | null;
  public verificationLevel: VerificationLevel;
  public bannerURL(options?: StaticImageURLOptions): string | null;
  public splashURL(options?: StaticImageURLOptions): string | null;
}

export abstract class Application extends Base {
  protected constructor(client: Client, data: RawApplicationData);
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public description: string | null;
  public icon: string | null;
  public id: Snowflake;
  public name: string | null;
  public termsOfServiceURL: string | null;
  public privacyPolicyURL: string | null;
  public verifyKey: string | null;
  public roleConnectionsVerificationURL: string | null;
  public approximateGuildCount: number | null;
  /** @deprecated */
  public botPublic: boolean | null;
  /** @deprecated */
  public botRequireCodeGrant: boolean | null;
  public commands: ApplicationCommandManager;
  public cover: string | null;
  public flags: Readonly<ApplicationFlags>;
  public guildId: Snowflake | null;
  public readonly guild: Guild | null;
  public tags: string[];
  public installParams: ClientApplicationInstallParams | null;
  public customInstallURL: string | null;
  public owner: User | Team | null;
  public readonly partial: boolean;
  public rpcOrigins: string[];
  public splash: string | null;
  public type: ApplicationType | null;
  public primarySkuId: Snowflake | null;
  public eulaId: Snowflake | null;
  public slug: string | null;
  public aliases: string[];
  public executables: { os: string; name: string; is_launcher: boolean }[] | null;
  public thirdPartySkus: { id: Snowflake | null; sku: string | null; distributor: string }[] | null;
  public hook: boolean | null;
  public overlay: boolean | null;
  public overlayMethods: number | null;
  public overlayWarn: boolean | null;
  public overlayCompatibilityHook: boolean | null;
  public bot: User | PartialUser | null;
  public developers: { id: Snowflake; name: string }[] | null;
  public publishers: { id: Snowflake; name: string }[] | null;
  public redirectUris: string[] | null;
  public deeplinkUri: string | null;
  public integrationPublic: boolean | null;
  public integrationRequireCodeGrant: boolean | null;
  public botDisabled: boolean | null;
  public botQuarantined: boolean | null;
  public approximateUserInstallCount: number | null;
  public approximateUserAuthorizationCount: number | null;
  public internalGuildRestriction: number | null;
  public interactionsEndpointUrl: string | null;
  public interactionsVersion: number | null;
  public interactionsEventTypes: string[] | null;
  public eventWebhooksStatus: number | null;
  public eventWebhooksUrl: string | null;
  public eventWebhooksTypes: string[] | null;
  public explicitContentFilter: number | null;
  public integrationTypesConfig: Record<
    number,
    { oauth2_install_params: ClientApplicationInstallParams | null }
  > | null;
  public isVerified: boolean | null;
  public verificationState: number | null;
  public storeApplicationState: number | null;
  public rpcApplicationState: number | null;
  public creatorMonetizationState: number | null;
  public isDiscoverable: boolean | null;
  public discoverabilityState: number | null;
  public discoveryEligibilityFlags: number | null;
  public isMonetized: boolean | null;
  public storefrontAvailable: boolean | null;
  public monetizationState: number | null;
  public monetizationEligibilityFlags: number | null;
  public maxParticipants: number | null;
  public fetch(): Promise<Application>;
  public fetchRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnectionMetadata[]>;
  public coverURL(options?: StaticImageURLOptions): string | null;
  /** @deprecated This method is deprecated as it is unsupported and will be removed in the next major version. */
  public fetchAssets(): Promise<ApplicationAsset[]>;
  public iconURL(options?: StaticImageURLOptions): string | null;
  public toJSON(): unknown;
  public toString(): string | null;
}

export class ApplicationCommand<PermissionsFetchType = {}> extends Base {
  private constructor(client: Client, data: RawApplicationCommandData, guild?: Guild, guildId?: Snowflake);
  public applicationId: Snowflake;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  /** @deprecated Use {@link defaultMemberPermissions} and {@link dmPermission} instead. */
  public defaultPermission: boolean;
  public defaultMemberPermissions: Readonly<Permissions> | null;
  public description: string;
  public descriptionLocalizations: LocalizationMap | null;
  public descriptionLocalized: string | null;
  public dmPermission: boolean | null;
  public guild: Guild | null;
  public guildId: Snowflake | null;
  public readonly manager: ApplicationCommandManager;
  public id: Snowflake;
  public name: string;
  public nameLocalizations: LocalizationMap | null;
  public nameLocalized: string | null;
  public options: (ApplicationCommandOption & { nameLocalized?: string; descriptionLocalized?: string })[];
  public permissions: ApplicationCommandPermissionsManager<
    PermissionsFetchType,
    PermissionsFetchType,
    PermissionsFetchType,
    Guild | null,
    Snowflake
  >;
  public type: ApplicationCommandType;
  public version: Snowflake;
  public delete(): Promise<ApplicationCommand<PermissionsFetchType>>;
  public edit(data: Partial<ApplicationCommandData>): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setName(name: string): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setNameLocalizations(nameLocalizations: LocalizationMap): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setDescription(description: string): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setDescriptionLocalizations(
    descriptionLocalizations: LocalizationMap,
  ): Promise<ApplicationCommand<PermissionsFetchType>>;
  /** @deprecated Use {@link setDefaultMemberPermissions} and {@link setDMPermission} instead. */
  public setDefaultPermission(defaultPermission?: boolean): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setDefaultMemberPermissions(
    defaultMemberPermissions: PermissionResolvable | null,
  ): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setDMPermission(dmPermission?: boolean): Promise<ApplicationCommand<PermissionsFetchType>>;
  public setOptions(options: ApplicationCommandOptionData[]): Promise<ApplicationCommand<PermissionsFetchType>>;
  public equals(
    command: ApplicationCommand | ApplicationCommandData | RawApplicationCommandData,
    enforceOptionorder?: boolean,
  ): boolean;
  public static optionsEqual(
    existing: ApplicationCommandOption[],
    options: ApplicationCommandOption[] | ApplicationCommandOptionData[] | APIApplicationCommandOption[],
    enforceOptionorder?: boolean,
  ): boolean;
  private static _optionEquals(
    existing: ApplicationCommandOption,
    options: ApplicationCommandOption | ApplicationCommandOptionData | APIApplicationCommandOption,
    enforceOptionorder?: boolean,
  ): boolean;
  private static transformOption(option: ApplicationCommandOptionData, received?: boolean): unknown;
  private static transformCommand(command: ApplicationCommandData): RESTPostAPIApplicationCommandsJSONBody;
  private static isAPICommandData(command: object): command is RESTPostAPIApplicationCommandsJSONBody;
}

export class ApplicationRoleConnectionMetadata {
  private constructor(data: APIApplicationRoleConnectionMetadata);
  public name: string;
  public nameLocalizations: LocalizationMap | null;
  public description: string;
  public descriptionLocalizations: LocalizationMap | null;
  public key: string;
  public type: ApplicationRoleConnectionMetadataTypes;
}

export type ApplicationResolvable = Application | Activity | Snowflake;

export type AutoModerationRuleResolvable = AutoModerationRule | Snowflake;

export class ApplicationFlags extends BitField<ApplicationFlagsString> {
  public static FLAGS: Record<ApplicationFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<ApplicationFlagsString, number>): number;
}

export abstract class Base {
  public constructor(client: Client);
  public readonly client: Client;
  public toJSON(...props: Record<string, boolean | string>[]): unknown;
  public valueOf(): string;
}

export class RESTManager {
  private constructor(client: Client);
  public readonly client: Client;
  public handlers: Collection<string, unknown>;
  public versioned: true;
  public cookieJar: CookieJar;
  public fetch: typeof globalThis.fetch;
  public getAuth(): string;
  public readonly api: unknown;
  public readonly cdn: unknown;
}

// Missing partial types
export type PartialUser = { id: Snowflake; bot?: boolean; username?: string };
export type PartialMessage = { id: Snowflake; channelId: Snowflake; guildId?: Snowflake | null };
export type PartialGuildMember = { id: Snowflake; guild: Guild };
export type PartialVoiceState = { id: Snowflake | null; channelId: Snowflake | null };
export type PartialGroupDMChannel = { id: Snowflake };

// REST event payloads
export interface RateLimitData {
  timeout: number;
  limit: number;
  method: string;
  path: string;
  route: string;
  global: boolean;
}
export interface APIRequest {
  method: string;
  path: string;
  route: string;
  options: unknown;
  retries: number;
}
export interface InvalidRequestWarningData {
  count: number;
  remainingTime: number;
}
export interface ApplicationCommandPermissionsUpdateData {
  id: Snowflake;
  guildId: Snowflake;
  applicationId: Snowflake;
  permissions: APIApplicationCommandPermission[];
}
export interface AutoModerationRule {
  id: Snowflake;
  guild: Guild;
  creatorId: Snowflake | null;
  name: string;
  eventType: AutoModerationRuleEventTypes;
  triggerType: AutoModerationRuleTriggerTypes;
  triggerMetadata: unknown;
  actions: unknown[];
  enabled: boolean;
  exemptRoles: Collection<Snowflake, Role>;
  exemptChannels: Collection<Snowflake, Channel>;
}
export interface AutoModerationActionExecution {
  guild: Guild;
  action: unknown;
  ruleId: Snowflake;
  ruleTriggerType: AutoModerationRuleTriggerTypes;
  userId: Snowflake;
  channelId: Snowflake | null;
  messageId: Snowflake | null;
  alertSystemMessageId: Snowflake | null;
  content: string;
  matchedKeyword: Snowflake | null;
  matchedContent: Snowflake | null;
}

export type BaseClientEvents = {
  ready: [Client];
  error: [Error];
  warn: [string];
  debug: [string];
  invalidated: [];
  rateLimit: [RateLimitData];
  apiRequest: [APIRequest];
  apiResponse: [APIRequest, Response];
  invalidRequestWarning: [InvalidRequestWarningData];
};

export type ClientEvents = BaseClientEvents & {
  applicationCommandCreate: [ApplicationCommand];
  applicationCommandDelete: [ApplicationCommand];
  applicationCommandUpdate: [ApplicationCommand, ApplicationCommand];
  applicationCommandPermissionsUpdate: [ApplicationCommandPermissionsUpdateData];
  autoModerationActionExecution: [AutoModerationActionExecution];
  autoModerationRuleCreate: [AutoModerationRule];
  autoModerationRuleDelete: [AutoModerationRule];
  autoModerationRuleUpdate: [AutoModerationRule, AutoModerationRule];
  cacheSweep: [string];
  callCreate: [CallState];
  callUpdate: [CallState];
  callDelete: [CallState];
  channelCreate: [DMChannel | GroupDMChannel | GuildChannel];
  channelDelete: [DMChannel | GroupDMChannel | GuildChannel];
  channelPinsUpdate: [Channel, Date];
  channelRecipientAdd: [DMChannel | GroupDMChannel, User | PartialUser];
  channelRecipientRemove: [DMChannel | GroupDMChannel, User | PartialUser];
  channelUpdate: [Channel, Channel];
  emojiCreate: [GuildEmoji];
  emojiDelete: [GuildEmoji];
  emojiUpdate: [GuildEmoji, GuildEmoji];
  guildAuditLogEntryCreate: [GuildAuditLogsEntry, Guild];
  guildBanAdd: [GuildBan];
  guildBanRemove: [GuildBan];
  guildCreate: [Guild];
  guildDelete: [Guild];
  guildIntegrationsUpdate: [Guild];
  guildMemberAdd: [GuildMember | PartialGuildMember];
  guildMemberAvailable: [GuildMember | PartialGuildMember];
  guildMemberRemove: [GuildMember | PartialGuildMember];
  guildMemberSpeaking: [GuildMember | PartialGuildMember, Readonly<Set<VoiceState>>];
  guildMemberUpdate: [GuildMember | PartialGuildMember, GuildMember | PartialGuildMember];
  guildMembersChunk: [
    Collection<Snowflake, GuildMember>,
    Guild,
    { count?: number; index?: number; nonce?: string | null },
  ];
  guildScheduledEventCreate: [GuildScheduledEvent];
  guildScheduledEventDelete: [GuildScheduledEvent];
  guildScheduledEventUpdate: [GuildScheduledEvent, GuildScheduledEvent];
  guildScheduledEventUserAdd: [GuildScheduledEvent, User | PartialUser];
  guildScheduledEventUserRemove: [GuildScheduledEvent, User | PartialUser];
  guildUnavailable: [Guild];
  guildUpdate: [Guild, Guild];
  interactionCreate: [Interaction];
  interactionModalCreate: [Modal];
  inviteCreate: [Invite];
  inviteDelete: [Invite];
  messageCreate: [Message];
  messageDelete: [Message | PartialMessage];
  messageDeleteBulk: [Collection<Snowflake, Message | PartialMessage>];
  messagePollVoteAdd: [PollAnswer, Snowflake];
  messagePollVoteRemove: [PollAnswer, Snowflake];
  messageReactionAdd: [MessageReaction, User | PartialUser, MessageReactionEventDetails];
  messageReactionRemove: [MessageReaction, User | PartialUser, MessageReactionEventDetails];
  messageReactionRemoveAll: [Message | PartialMessage];
  messageReactionRemoveEmoji: [MessageReaction];
  messageUpdate: [Message | PartialMessage, Message | PartialMessage];
  presenceUpdate: [Presence | undefined, Presence | undefined];
  relationshipAdd: [Snowflake, boolean];
  relationshipRemove: [Snowflake, number, string | null];
  relationshipUpdate: [Snowflake, RelationshipUpdateObject, RelationshipUpdateObject];
  roleCreate: [Role];
  roleDelete: [Role];
  roleUpdate: [Role, Role];
  shardDisconnect: [CloseEvent, number];
  shardError: [Error, number];
  shardReady: [number, number | undefined];
  shardReconnecting: [number];
  shardResume: [number, number];
  stageInstanceCreate: [StageInstance];
  stageInstanceDelete: [StageInstance];
  stageInstanceUpdate: [StageInstance, StageInstance];
  stickerCreate: [Sticker];
  stickerDelete: [Sticker];
  stickerUpdate: [Sticker, Sticker];
  threadCreate: [ThreadChannel, boolean];
  threadDelete: [ThreadChannel];
  threadListSync: [Collection<Snowflake, ThreadChannel>];
  threadMemberUpdate: [ThreadMember, ThreadMember];
  threadMembersUpdate: [Collection<Snowflake, ThreadMember>, Collection<Snowflake, ThreadMember>];
  threadUpdate: [ThreadChannel, ThreadChannel];
  typingStart: [Typing];
  unhandledPacket: [unknown, WebSocketShard];
  userUpdate: [User | PartialUser, User | PartialUser];
  voiceChannelEffectSend: [VoiceChannelEffect];
  voiceServerUpdate: [VoiceState];
  voiceStateUpdate: [VoiceState | PartialVoiceState, VoiceState | PartialVoiceState];
  webhookUpdate: [Channel];
};

export type RelationshipUpdateObject = {
  type: number;
  since: Date;
  nickname: string | null;
};

export class BaseClient extends EventEmitter {
  public constructor(options?: ClientOptions | WebhookClientOptions);
  public readonly api: RESTManager['api'];
  public rest: RESTManager;
  private decrementMaxListeners(): void;
  private incrementMaxListeners(): void;

  public on<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public once<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public emit<K extends keyof BaseClientEvents>(event: K, ...args: BaseClientEvents[K]): boolean;
  public emit<S extends string | symbol>(event: Exclude<S, keyof BaseClientEvents>, ...args: unknown[]): boolean;

  public off<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public removeAllListeners<K extends keyof BaseClientEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof BaseClientEvents>): this;

  public options: ClientOptions | WebhookClientOptions;
  public destroy(): void;
  public toJSON(...props: Record<string, boolean | string>[]): unknown;
}

export type GuildCacheMessage<Cached extends CacheType> = CacheTypeReducer<
  Cached,
  Message<true>,
  APIMessage,
  Message | APIMessage,
  Message | APIMessage
>;

export interface InteractionResponseFields<Cached extends CacheType = CacheType> {
  deferred: boolean;
  ephemeral: boolean | null;
  replied: boolean;
  webhook: InteractionWebhook;
  reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;
  deleteReply(message?: MessageResolvable | '@original'): Promise<void>;
  editReply(options: string | MessagePayload | InteractionEditReplyOptions): Promise<GuildCacheMessage<Cached>>;
  deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  deferReply(options?: InteractionDeferReplyOptions): Promise<void>;
  fetchReply(message?: MessageResolvable | '@original'): Promise<GuildCacheMessage<Cached>>;
  followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;
}

export abstract class BaseCommandInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  public readonly command: ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;
  public options: Omit<
    CommandInteractionOptionResolver<Cached>,
    | 'getMessage'
    | 'getFocused'
    | 'getMentionable'
    | 'getRole'
    | 'getNumber'
    | 'getInteger'
    | 'getString'
    | 'getChannel'
    | 'getBoolean'
    | 'getSubcommandGroup'
    | 'getSubcommand'
    | 'getAttachment'
  >;
  public channelId: Snowflake;
  public commandId: Snowflake;
  public commandName: string;
  public deferred: boolean;
  public ephemeral: boolean | null;
  public replied: boolean;
  public webhook: InteractionWebhook;
  public awaitModalSubmit(
    options: AwaitModalSubmitOptions<ModalSubmitInteraction>,
  ): Promise<ModalSubmitInteraction<Cached>>;
  public inGuild(): this is BaseCommandInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is BaseCommandInteraction<'cached'>;
  public inRawGuild(): this is BaseCommandInteraction<'raw'>;
  public deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options?: InteractionDeferReplyOptions): Promise<void>;
  public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;
  public editReply(options: string | MessagePayload | InteractionEditReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public fetchReply(message?: MessageResolvable | '@original'): Promise<GuildCacheMessage<Cached>>;
  public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;
  public showModal(modal: Modal | ModalOptions): Promise<void>;
  private transformOption(
    option: APIApplicationCommandOption,
    resolved: Extract<
      APIApplicationCommandInteractionData,
      APIChatInputApplicationCommandInteractionData | APIContextMenuInteractionData
    >['resolved'],
  ): CommandInteractionOption<Cached>;
  private transformResolved(
    resolved: Extract<
      APIApplicationCommandInteractionData,
      APIChatInputApplicationCommandInteractionData | APIContextMenuInteractionData
    >['resolved'],
  ): CommandInteractionResolvedData<Cached>;
}

export abstract class BaseGuild extends Base {
  protected constructor(client: Client, data: RawBaseGuildData);
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public features: GuildFeatures[];
  public icon: string | null;
  public id: Snowflake;
  public name: string;
  public readonly nameAcronym: string;
  public readonly partnered: boolean;
  public readonly verified: boolean;
  public fetch(): Promise<Guild>;
  public iconURL(options?: ImageURLOptions): string | null;
  public toString(): string;
}

export class BaseGuildEmoji extends Emoji {
  protected constructor(client: Client, data: RawGuildEmojiData, guild: Guild | GuildPreview);
  public available: boolean | null;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public guild: Guild | GuildPreview;
  public id: Snowflake;
  public managed: boolean | null;
  public requiresColons: boolean | null;
}

export class BaseGuildTextChannel extends TextBasedChannelMixin(GuildChannel) {
  protected constructor(guild: Guild, data?: RawGuildChannelData, client?: Client, immediatePatch?: boolean);
  public defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;
  public defaultThreadRateLimitPerUser: number | null;
  public rateLimitPerUser: number | null;
  public nsfw: boolean;
  public threads: GuildTextThreadManager<AllowedThreadTypeForTextChannel | AllowedThreadTypeForNewsChannel>;
  public topic: string | null;
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;
  public setDefaultAutoArchiveDuration(
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration | 'MAX',
    reason?: string,
  ): Promise<this>;
  public setTopic(topic: string | null, reason?: string): Promise<this>;
  public setType(type: Pick<typeof ChannelTypes, 'GUILD_TEXT'>, reason?: string): Promise<TextChannel>;
  public setType(type: Pick<typeof ChannelTypes, 'GUILD_NEWS'>, reason?: string): Promise<NewsChannel>;
}

export class BaseGuildVoiceChannel extends TextBasedChannelMixin(GuildChannel, ['lastPinTimestamp', 'lastPinAt']) {
  public constructor(guild: Guild, data?: RawGuildChannelData);
  public readonly members: Collection<Snowflake, GuildMember>;
  public readonly full: boolean;
  public readonly joinable: boolean;
  public bitrate: number;
  public nsfw: boolean;
  public rtcRegion: string | null;
  public rateLimitPerUser: number | null;
  public userLimit: number;
  public videoQualityMode: VideoQualityMode | null;
  public status?: string;
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;
  public setRTCRegion(rtcRegion: string | null, reason?: string): Promise<this>;
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;
  public setBitrate(bitrate: number, reason?: string): Promise<VoiceChannel>;
  public setUserLimit(userLimit: number, reason?: string): Promise<VoiceChannel>;
  public setVideoQualityMode(videoQualityMode: VideoQualityMode | number, reason?: string): Promise<VoiceChannel>;
}

export class BaseMessageComponent {
  protected constructor(data?: BaseMessageComponent | BaseMessageComponentOptions);
  public type: MessageComponentType | null;
  public readonly id: number;
  public data: MessageComponentOptions;
  private static create(data: MessageComponentOptions, client?: Client | WebhookClient): MessageComponent | undefined;
  private static resolveType(type: MessageComponentTypeResolvable): MessageComponentType;
}

export class BitField<S extends string, N extends number | bigint = number> {
  public constructor(bits?: BitFieldResolvable<S, N>);
  public bitfield: N;
  public add(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;
  public any(bit: BitFieldResolvable<S, N>): boolean;
  public equals(bit: BitFieldResolvable<S, N>): boolean;
  public freeze(): Readonly<BitField<S, N>>;
  public has(bit: BitFieldResolvable<S, N>): boolean;
  public missing(bits: BitFieldResolvable<S, N>, ...hasParams: readonly unknown[]): S[];
  public remove(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;
  public serialize(...hasParams: readonly unknown[]): Record<S, boolean>;
  public toArray(...hasParams: readonly unknown[]): S[];
  public toJSON(): N extends number ? number : string;
  public valueOf(): N;
  public [Symbol.iterator](): IterableIterator<S>;
  public static FLAGS: Record<string, number | bigint>;
  public static resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint;
}

export class ButtonInteraction<Cached extends CacheType = CacheType> extends MessageComponentInteraction<Cached> {
  private constructor(client: Client, data: RawMessageButtonInteractionData);
  public readonly component: CacheTypeReducer<
    Cached,
    MessageButton,
    APIButtonComponent,
    MessageButton | APIButtonComponent,
    MessageButton | APIButtonComponent
  >;
  public componentType: 'BUTTON';
  public inGuild(): this is ButtonInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is ButtonInteraction<'cached'>;
  public inRawGuild(): this is ButtonInteraction<'raw'>;
}

export type KeyedEnum<K, T> = {
  [Key in keyof K]: T | string;
};

export type EnumValueMapped<E extends KeyedEnum<T, number>, T extends Partial<Record<keyof E, unknown>>> = T & {
  [Key in keyof T as E[Key]]: T[Key];
};

export type MappedChannelCategoryTypes = EnumValueMapped<
  typeof ChannelTypes,
  {
    GUILD_NEWS: NewsChannel;
    GUILD_VOICE: VoiceChannel;
    GUILD_TEXT: TextChannel;
    GUILD_STORE: StoreChannel;
    GUILD_STAGE_VOICE: StageChannel;
    GUILD_FORUM: ForumChannel;
    GUILD_MEDIA: MediaChannel;
  }
>;

export type CategoryChannelTypes = ExcludeEnum<
  typeof ChannelTypes,
  | 'DM'
  | 'GROUP_DM'
  | 'UNKNOWN'
  | 'GUILD_PUBLIC_THREAD'
  | 'GUILD_NEWS_THREAD'
  | 'GUILD_PRIVATE_THREAD'
  | 'GUILD_CATEGORY'
  | 'GUILD_DIRECTORY'
>;

export class CategoryChannel extends GuildChannel {
  public readonly children: Collection<Snowflake, Exclude<NonThreadGuildBasedChannel, CategoryChannel>>;
  public static parent: null;
  public parentId: null;
  public type: 'GUILD_CATEGORY';

  public createChannel<T extends Exclude<CategoryChannelTypes, 'GUILD_STORE' | ChannelTypes.GUILD_STORE>>(
    name: string,
    options: CategoryCreateChannelOptions & { type: T },
  ): Promise<MappedChannelCategoryTypes[T]>;
  /** @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/6309018858647) for more information */
  public createChannel(
    name: string,
    options: CategoryCreateChannelOptions & { type: 'GUILD_STORE' | ChannelTypes.GUILD_STORE },
  ): Promise<StoreChannel>;
  public createChannel(name: string, options?: CategoryCreateChannelOptions): Promise<TextChannel>;
}

export type CategoryChannelResolvable = Snowflake | CategoryChannel;

export abstract class Channel extends Base {
  public constructor(client: Client, data?: RawChannelData, immediatePatch?: boolean);
  public readonly createdAt: Date | null;
  public readonly createdTimestamp: number | null;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public id: Snowflake;
  public readonly partial: false;
  public type: keyof typeof ChannelTypes;
  public flags: Readonly<ChannelFlags> | null;
  public delete(): Promise<this>;
  public fetch(force?: boolean): Promise<this>;
  public isText(): this is TextBasedChannel;
  public isVoice(): this is BaseGuildVoiceChannel;
  public isThread(): this is ThreadChannel;
  public isDirectory(): this is DirectoryChannel;
  public isThreadOnly(): this is ThreadOnlyChannel;
  public toString(): ChannelMention;
}

export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;

export class Client<Ready extends boolean = boolean> extends BaseClient {
  public constructor(options?: ClientOptions);
  private actions: unknown;
  public authenticator: typeof authenticator;
  private presence: ClientPresence;
  private _eval(script: string): unknown;
  private _validateOptions(options: ClientOptions): void;
  public channels: ChannelManager;
  public readonly emojis: BaseGuildEmojiManager;
  public guilds: GuildManager;
  public options: ClientOptions;
  public readyAt: If<Ready, Date>;
  public readonly readyTimestamp: If<Ready, number>;
  public sweepers: Sweepers;
  public shard: ShardClientUtil | null;
  public token: If<Ready, string, string | null>;
  public uptime: If<Ready, number>;
  public user: If<Ready, ClientUser>;
  public users: UserManager;
  public voice: ClientVoiceManager;
  public ws: WebSocketManager;
  public notes: UserNoteManager;
  public relationships: RelationshipManager;
  public voiceStates: VoiceStateManager;
  public sessions: SessionManager;
  public presences: PresenceManager;
  public billing: BillingManager;
  public settings: ClientUserSettingManager;
  public readonly sessionId: If<Ready, string, undefined>;
  public destroy(): void;
  public fetchGuildPreview(guild: GuildResolvable): Promise<GuildPreview>;
  public fetchInvite(invite: InviteResolvable, options?: ClientFetchInviteOptions): Promise<Invite>;
  public fetchGuildTemplate(template: GuildTemplateResolvable): Promise<GuildTemplate>;
  public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
  public fetchSticker(id: Snowflake): Promise<Sticker>;
  public fetchPremiumStickerPacks(): Promise<Collection<Snowflake, StickerPack>>;
  public fetchWebhook(id: Snowflake, token?: string): Promise<Webhook>;
  public fetchGuildWidget(guild: GuildResolvable): Promise<Widget>;
  public refreshAttachmentURL(...urls: string[]): Promise<{ original: string; refreshed: string }[]>;
  public sleep(timeout: number): Promise<void>;
  public login(token?: string): Promise<string>;
  /** @deprecated This method will not be updated until I find the most convenient way to implement MFA. */
  public passLogin(email: string, password: string): Promise<string | null>;
  public QRLogin(): Promise<void>;
  public logout(): Promise<void>;
  public isReady(): this is Client<true>;
  /** @deprecated Use {@link Sweepers#sweepMessages} instead */
  public sweepMessages(lifetime?: number): number;
  public toJSON(): unknown;
  public acceptInvite(
    invite: InviteResolvable,
    options?: AcceptInviteOptions,
  ): Promise<Guild | DMChannel | GroupDMChannel>;
  public redeemNitro(nitro: string, channel?: TextChannelResolvable, paymentSourceId?: Snowflake): Promise<any>;
  public authorizeURL(urlOAuth2: string, options?: OAuth2AuthorizeOptions): Promise<{ location: string }>;
  public installUserApps(applicationId: Snowflake): Promise<void>;
  public deauthorize(id: Snowflake, type?: 'application' | 'token'): Promise<void>;
  public authorizedApplications(): Promise<
    Collection<
      Snowflake,
      {
        application: Application;
        scopes: string[];
        authorizedApplicationId: Snowflake;
        deauthorize: () => Promise<void>;
      }
    >
  >;

  public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
  public emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]): boolean;

  public off<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public removeAllListeners<K extends keyof ClientEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>): this;
}

export interface AcceptInviteOptions {
  bypassOnboarding: boolean;
  bypassVerify: boolean;
}

export type OAuth2AuthorizeOptions = {
  guild_id?: Snowflake;
  permissions?: string;
  authorize?: boolean;
  code?: string;
  webhook_channel_id?: Snowflake;
} & Record<string, unknown>;

export class ClientPresence extends Presence {
  private constructor(client: Client, data: RawPresenceData);
  private _parse(data: PresenceData): RawPresenceData;

  public set(presence: PresenceData): ClientPresence;
}

export class ClientUser extends User {
  public mfaEnabled: boolean;
  public readonly presence: ClientPresence;
  public verified: boolean;
  public edit(data: ClientUserEditData): Promise<this>;
  public setActivity(options?: ActivityOptions | RichPresence | SpotifyRPC | CustomStatus): ClientPresence;
  public setActivity(name: string, options?: Omit<ActivityOptions, 'name'>): ClientPresence;
  public setAFK(afk?: boolean, shardId?: number | number[]): ClientPresence;
  public setAvatar(avatar: BufferResolvable | Base64Resolvable | null): Promise<this>;
  public setPresence(data: PresenceData): ClientPresence;
  public setStatus(status: PresenceStatusData, shardId?: number | number[]): ClientPresence;
  public setUsername(username: string, password: string): Promise<this>;
  public purchasedFlags: Readonly<PurchasedFlags>;
  public premiumUsageFlags: Readonly<PremiumUsageFlags>;
  public phone: string | null;
  public nsfwAllowed?: boolean;
  public email: string | null;
  public bio?: string;
  public pronouns?: string;
  public premiumType: number;
  public setBanner(banner: BufferResolvable | Base64Resolvable | null): Promise<this>;
  public setHypeSquad(
    hypesquad: 0 | 1 | 2 | 3 | 'LEAVE' | 'HOUSE_BRAVERY' | 'HOUSE_BRILLIANCE' | 'HOUSE_BALANCE',
  ): Promise<void>;
  public setAccentColor(color: ColorResolvable): Promise<this>;
  public setAboutMe(bio: string | null): Promise<this>;
  public createFriendInvite(): Promise<Invite>;
  public getAllFriendInvites(): Promise<Collection<string, Invite>>;
  public revokeAllFriendInvites(): Promise<void>;
  public setSamsungActivity(packageName: string, type: 'START' | 'UPDATE' | 'STOP'): Promise<this>;
  public stopRinging(channel: ChannelResolvable): Promise<void>;
  public fetchBurstCredit(): Promise<number>;
  public setPronouns(pronouns?: string | null): Promise<this>;
  public setGlobalName(globalName?: string | null): Promise<this>;
}

export class Options extends null {
  private constructor();
  public static defaultMakeCacheSettings: CacheWithLimitsOptions;
  public static defaultSweeperSettings: SweeperOptions;
  public static createDefault(): ClientOptions;
  public static cacheWithLimits(settings?: CacheWithLimitsOptions): CacheFactory;
  public static cacheEverything(): CacheFactory;
}

export class ClientVoiceManager {
  private constructor(client: Client);
  public readonly client: Client;
  public adapters: Map<Snowflake, InternalDiscordGatewayAdapterLibraryMethods>;
  public connection: VoiceConnection | null;

  public joinChannel(
    channel: VoiceBasedChannel | DMChannel | GroupDMChannel | Snowflake,
    config?: JoinChannelConfig,
  ): Promise<VoiceConnection>;
}

export interface JoinChannelConfig {
  selfMute?: boolean;
  selfDeaf?: boolean;
  selfVideo?: boolean;
  videoCodec?: VideoCodec;
}

export type VideoCodec = 'VP8' | 'H264';

export class VolumeInterface extends EventEmitter {
  constructor(options?: { volume?: number });
  public readonly volume: number;
  public readonly volumeDecibels: number;
  public readonly volumeEditable: boolean;
  public readonly volumeLogarithmic: number;
  public setVolume(volume: number): void;
  public setVolumeDecibels(db: number): void;
  public setVolumeLogarithmic(value: number): void;

  public on(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;

  public once(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;
}

export function VolumeMixin<T>(base: Constructable<T>): Constructable<T & VolumeInterface>;

export type StreamType = 'unknown' | 'converted' | 'opus' | 'ogg/opus' | 'webm/opus';

export interface StreamOptions {
  type?: StreamType;
  seek?: number;
  volume?: number | boolean;
  plp?: number;
  fec?: boolean;
  bitrate?: number | 'auto';
  highWaterMark?: number;
}
export interface VideoOptions {
  seek?: number;
  highWaterMark?: number;
  fps?: number;
  hwAccel?: boolean;
  presetH26x?: 'ultrafast' | 'superfast' | 'veryfast' | 'faster' | 'fast' | 'medium' | 'slow' | 'slower' | 'veryslow';
  inputFFmpegArgs?: string[];
  outputFFmpegArgs?: string[];
  bitrate?: number | 'auto';
}

export class BaseDispatcher extends Writable {
  constructor(
    player: object,
    highWaterMark?: number,
    payloadType?: number,
    extensionEnabled?: boolean,
    streams?: object,
  );
  public readonly paused: boolean;
  public pausedSince: number | null;
  public readonly pausedTime: number;
  public player: object;
  public readonly streamTime: number;
  public readonly totalStreamTime: number;
  public count: number;
  public sequence: number;
  public timestamp: number;
  public payloadType: number;
  public extensionEnabled: boolean;

  public pause(silence?: boolean): void;
  public resume(): void;

  public on(event: 'close' | 'drain' | 'finish' | 'start', listener: () => void): this;
  public on(event: 'debug', listener: (info: string) => void): this;
  public on(event: 'error', listener: (err: Error) => void): this;
  public on(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
  public on(event: 'speaking', listener: (speaking: boolean) => void): this;
  public on(event: string, listener: (...args: any[]) => void): this;

  public once(event: 'close' | 'drain' | 'finish' | 'start', listener: () => void): this;
  public once(event: 'debug', listener: (info: string) => void): this;
  public once(event: 'error', listener: (err: Error) => void): this;
  public once(event: 'pipe' | 'unpipe', listener: (src: Readable) => void): this;
  public once(event: 'speaking', listener: (speaking: boolean) => void): this;
  public once(event: string, listener: (...args: any[]) => void): this;
}

export class AudioDispatcher extends VolumeMixin(BaseDispatcher) {
  constructor(player: object, options?: StreamOptions, streams?: object);
  public readonly bitrateEditable: boolean;

  public getTypeDispatcher(): 'audio';

  public setBitrate(value: number | 'auto'): boolean;
  public setFEC(enabled: boolean): boolean;
  public setPLP(value: number): boolean;

  public setSyncVideoDispatcher(otherDispatcher: VideoDispatcher): void;

  public on(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;
  public on(event: string, listener: (...args: any[]) => void): this;

  public once(event: 'volumeChange', listener: (oldVolume: number, newVolume: number) => void): this;
  public once(event: string, listener: (...args: any[]) => void): this;
}

export class VideoDispatcher extends BaseDispatcher {
  constructor(player: object, options?: StreamOptions, streams?: object, fps?: number);

  public mtu: number;
  public fps: number;

  public getTypeDispatcher(): 'video';

  public setFPSSource(value: number): void;
}

export class VoiceConnection extends EventEmitter {
  constructor(voiceManager: ClientVoiceManager, channel: VoiceChannel);
  private authentication: object;
  private sockets: object;
  private ssrcMap: Map<number, boolean>;
  private _speaking: Map<Snowflake, Readonly<Speaking>>;
  private _disconnect(): void;
  private authenticate(): void;
  private authenticateFailed(reason: string): void;
  private checkAuthenticated(): void;
  private cleanup(): void;
  private connect(): void;
  private onReady(data: object): void;
  private onSessionDescription(mode: string, secret: string): void;
  private onSpeaking(data: object): void;
  private reconnect(token: string, endpoint: string): void;
  public sendVoiceStateUpdate(options: {
    self_video?: boolean;
    self_deaf?: boolean;
    self_mute?: boolean;
    guild_id?: Snowflake | null;
    channel_id?: Snowflake | null;
  }): Promise<Shard>;
  private setSessionId(sessionId: string): void;
  private setTokenAndEndpoint(token: string, endpoint: string): void;
  private updateChannel(channel: VoiceChannel): void;

  public channel: VoiceChannel;
  public readonly client: Client;
  public readonly dispatcher: AudioDispatcher;
  public readonly videoDispatcher?: VideoDispatcher;
  public player: object;
  public receiver: VoiceReceiver;
  public speaking: Readonly<Speaking>;
  public videoStatus: boolean;
  public status: VoiceStatus;
  public readonly voice: VoiceState | null;
  public voiceManager: ClientVoiceManager;
  public videoCodec: VideoCodec;
  public streamConnection: StreamConnection | null;
  public streamWatchConnection: Collection<Snowflake, StreamConnectionReadonly>;
  public disconnect(): void;
  public playAudio(input: Readable | string, options?: StreamOptions): AudioDispatcher;
  public playVideo(input: Readable | string, options?: VideoOptions): VideoDispatcher;
  public setSpeaking(value: BitFieldResolvable<SpeakingString, number>): void;
  public setVideoStatus(value: boolean): void;
  public setVideoCodec(value: VideoCodec): this;

  public on(event: 'authenticated' | 'closing' | 'newSession' | 'ready' | 'reconnecting', listener: () => void): this;
  public on(event: 'debug', listener: (message: string) => void): this;
  public on(event: 'error' | 'failed' | 'disconnect', listener: (error: Error) => void): this;
  public on(event: 'speaking', listener: (user: User, speaking: Readonly<Speaking>) => void): this;
  public on(event: 'warn', listener: (warning: string | Error) => void): this;
  public on(event: 'streamUpdate', listener: (oldState: StreamState, newState: StreamState) => void): this;
  public on(event: string, listener: (...args: any[]) => void): this;

  public once(event: 'authenticated' | 'closing' | 'newSession' | 'ready' | 'reconnecting', listener: () => void): this;
  public once(event: 'debug', listener: (message: string) => void): this;
  public once(event: 'error' | 'failed' | 'disconnect', listener: (error: Error) => void): this;
  public once(event: 'speaking', listener: (user: User, speaking: Readonly<Speaking>) => void): this;
  public once(event: 'warn', listener: (warning: string | Error) => void): this;
  public once(event: 'streamUpdate', listener: (oldState: StreamState, newState: StreamState) => void): this;
  public once(event: string, listener: (...args: any[]) => void): this;

  public createStreamConnection(): Promise<StreamConnection>;
  public joinStreamConnection(user: UserResolvable): Promise<StreamConnectionReadonly>;
}

export interface StreamState {
  isPaused: boolean;
  region: string | null;
  viewerIds: Snowflake[];
}

export class StreamConnection extends VoiceConnection {
  public createStreamConnection(): Promise<this>;
  public readonly voiceConnection: VoiceConnection;
  public serverId: Snowflake;
  public isPaused: boolean;
  public region: string | null;
  public streamConnection: this;
  public viewerIds: Snowflake[];
  public sendSignalScreenshare(): void;
  public sendScreenshareState(isPause: boolean): void;
  private sendStopScreenshare(): void;
  public readonly streamKey: string;
}

export class StreamConnectionReadonly extends VoiceConnection {
  public joinStreamConnection(): Promise<this>;
  public readonly voiceConnection: VoiceConnection;
  public serverId: Snowflake;
  public isPaused: boolean;
  public region: string | null;
  public userId: Snowflake;
  public streamConnection: null;
  public viewerIds: Snowflake[];
  public sendSignalScreenshare(): void;
  private sendStopScreenshare(): void;
  public readonly streamKey: string;
  /** @deprecated removed */
  public override playAudio(): AudioDispatcher;
  /** @deprecated removed */
  public override playVideo(): VideoDispatcher;
}

export class Recorder<Ready extends boolean = boolean, T = any> extends EventEmitter {
  constructor(receiver: T, options: { ffmpegArgs: string[]; channels: number; frameDuration: number });
  private promise: Promise<void>;
  public readonly receiver: T;
  public portUdpH264: number;
  public portUdpOpus: number;
  public ready: Ready;
  public stream: If<Ready, ChildProcessWithoutNullStreams>;
  public socket: Socket;
  public output: Writable | string;
  public userId: Snowflake;
  public feed(payload: RtpPacket | BufferResolvable): void;
  public on(event: 'ready' | 'closed', listener: (recorder: Recorder<true, T>) => void): this;
  public once(event: 'ready' | 'closed', listener: (recorder: Recorder<true, T>) => void): this;
  public destroy(): void;
}

export class VoiceReceiver extends EventEmitter {
  constructor(connection: VoiceConnection);
  public createStream(
    user: UserResolvable,
    options?: { mode?: 'opus' | 'pcm'; end?: 'silence' | 'manual'; paddingSilence?: boolean },
  ): Readable;
  public createVideoStream(user: UserResolvable, output: Writable | string): Recorder<false, any>;

  public on(event: 'debug', listener: (error: Error | string) => void): this;
  public on(
    event: 'receiverData',
    listener: (
      ssrcData: {
        userId: Snowflake;
        hasVideo: boolean;
      },
      packet: RtpPacket,
    ) => void,
  ): this;
  public on(event: string, listener: (...args: any[]) => void): this;

  public once(event: 'debug', listener: (error: Error | string) => void): this;
  public once(
    event: 'receiverData',
    listener: (
      ssrcData: {
        userId: Snowflake;
        hasVideo: boolean;
      },
      packet: RtpPacket,
    ) => void,
  ): this;
  public once(event: string, listener: (...args: any[]) => void): this;
}

export { Collection } from '@discordjs/collection';

export interface CollectorEventTypes<K, V, F extends unknown[] = []> {
  collect: [V, ...F];
  dispose: [V, ...F];
  end: [collected: Collection<K, V>, reason: string];
}

export type ChannelFlagsString = 'PINNED' | 'REQUIRE_TAG';
export class ChannelFlags extends BitField<ChannelFlagsString> {
  public static FLAGS: Record<ChannelFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<ChannelFlagsString, number>): number;
}

export abstract class Collector<K, V, F extends unknown[] = []> extends EventEmitter {
  protected constructor(client: Client, options?: CollectorOptions<[V, ...F]>);
  private _timeout: any | null;
  private _idletimeout: any | null;

  public readonly client: Client;
  public collected: Collection<K, V>;
  public ended: boolean;
  public abstract readonly endReason: string | null;
  public filter: CollectorFilter<[V, ...F]>;
  public readonly next: Promise<V>;
  public options: CollectorOptions<[V, ...F]>;
  public checkEnd(): boolean;
  public handleCollect(...args: unknown[]): Promise<void>;
  public handleDispose(...args: unknown[]): Promise<void>;
  public stop(reason?: string): void;
  public resetTimer(options?: CollectorResetTimerOptions): void;
  public [Symbol.asyncIterator](): AsyncIterableIterator<V>;
  public toJSON(): unknown;

  protected listener: (...args: any[]) => void;
  public abstract collect(...args: unknown[]): K | null | Promise<K | null>;
  public abstract dispose(...args: unknown[]): K | null;

  public on<EventKey extends keyof CollectorEventTypes<K, V, F>>(
    event: EventKey,
    listener: (...args: CollectorEventTypes<K, V, F>[EventKey]) => Awaitable<void>,
  ): this;

  public once<EventKey extends keyof CollectorEventTypes<K, V, F>>(
    event: EventKey,
    listener: (...args: CollectorEventTypes<K, V, F>[EventKey]) => Awaitable<void>,
  ): this;
}

export interface ApplicationCommandInteractionOptionResolver<Cached extends CacheType = CacheType>
  extends CommandInteractionOptionResolver<Cached> {
  getSubcommand(required?: true): string;
  getSubcommand(required: boolean): string | null;
  getSubcommandGroup(required?: true): string;
  getSubcommandGroup(required: boolean): string | null;
  getBoolean(name: string, required: true): boolean;
  getBoolean(name: string, required?: boolean): boolean | null;
  getChannel(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['channel']>;
  getChannel(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['channel']> | null;
  getString(name: string, required: true): string;
  getString(name: string, required?: boolean): string | null;
  getInteger(name: string, required: true): number;
  getInteger(name: string, required?: boolean): number | null;
  getNumber(name: string, required: true): number;
  getNumber(name: string, required?: boolean): number | null;
  getUser(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['user']>;
  getUser(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['user']> | null;
  getMember(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['member']>;
  getMember(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['member']> | null;
  getRole(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['role']>;
  getRole(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['role']> | null;
  getMentionable(
    name: string,
    required: true,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']>;
  getMentionable(
    name: string,
    required?: boolean,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']> | null;
}

export class CommandInteraction<Cached extends CacheType = CacheType> extends BaseCommandInteraction<Cached> {
  public options: Omit<CommandInteractionOptionResolver<Cached>, 'getMessage' | 'getFocused'>;
  public inGuild(): this is CommandInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is CommandInteraction<'cached'>;
  public inRawGuild(): this is CommandInteraction<'raw'>;
  public toString(): string;
}

export class AutocompleteInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  public readonly command: ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;
  public channelId: Snowflake;
  public commandId: Snowflake;
  public commandName: string;
  public responded: boolean;
  public options: Omit<CommandInteractionOptionResolver<Cached>, 'getMessage'>;
  public inGuild(): this is AutocompleteInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is AutocompleteInteraction<'cached'>;
  public inRawGuild(): this is AutocompleteInteraction<'raw'>;
  private transformOption(option: APIApplicationCommandOption): CommandInteractionOption;
  public respond(options: ApplicationCommandOptionChoiceData[]): Promise<void>;
}

export class CommandInteractionOptionResolver<Cached extends CacheType = CacheType> {
  private constructor(client: Client, options: CommandInteractionOption[], resolved: CommandInteractionResolvedData);
  public readonly client: Client;
  public readonly data: readonly CommandInteractionOption<Cached>[];
  public readonly resolved: Readonly<CommandInteractionResolvedData<Cached>>;
  private _group: string | null;
  private _hoistedOptions: CommandInteractionOption<Cached>[];
  private _subcommand: string | null;
  private _getTypedOption(
    name: string,
    type: ApplicationCommandOptionType,
    properties: (keyof ApplicationCommandOption)[],
    required: true,
  ): CommandInteractionOption<Cached>;
  private _getTypedOption(
    name: string,
    type: ApplicationCommandOptionType,
    properties: (keyof ApplicationCommandOption)[],
    required: boolean,
  ): CommandInteractionOption<Cached> | null;

  public get(name: string, required: true): CommandInteractionOption<Cached>;
  public get(name: string, required?: boolean): CommandInteractionOption<Cached> | null;

  public getSubcommand(required?: true): string;
  public getSubcommand(required: boolean): string | null;
  public getSubcommandGroup(required?: true): string;
  public getSubcommandGroup(required: boolean): string | null;
  public getBoolean(name: string, required: true): boolean;
  public getBoolean(name: string, required?: boolean): boolean | null;
  public getChannel(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['channel']>;
  public getChannel(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['channel']> | null;
  public getString(name: string, required: true): string;
  public getString(name: string, required?: boolean): string | null;
  public getInteger(name: string, required: true): number;
  public getInteger(name: string, required?: boolean): number | null;
  public getNumber(name: string, required: true): number;
  public getNumber(name: string, required?: boolean): number | null;
  public getUser(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['user']>;
  public getUser(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['user']> | null;
  public getMember(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['member']>;
  public getMember(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['member']> | null;
  public getRole(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['role']>;
  public getRole(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['role']> | null;
  public getMentionable(
    name: string,
    required: true,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']>;
  public getMentionable(
    name: string,
    required?: boolean,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']> | null;
  public getMessage(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['message']>;
  public getMessage(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['message']> | null;
  public getFocused(getFull: true): AutocompleteFocusedOption;
  public getFocused(getFull?: boolean): string;
  public getAttachment(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['attachment']>;
  public getAttachment(
    name: string,
    required?: boolean,
  ): NonNullable<CommandInteractionOption<Cached>['attachment']> | null;
}

export class ContextMenuInteraction<Cached extends CacheType = CacheType> extends BaseCommandInteraction<Cached> {
  public options: Omit<
    CommandInteractionOptionResolver<Cached>,
    | 'getFocused'
    | 'getMentionable'
    | 'getRole'
    | 'getNumber'
    | 'getInteger'
    | 'getString'
    | 'getChannel'
    | 'getBoolean'
    | 'getSubcommandGroup'
    | 'getSubcommand'
  >;
  public targetId: Snowflake;
  public targetType: Exclude<ApplicationCommandType, 'CHAT_INPUT'>;
  public inGuild(): this is ContextMenuInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is ContextMenuInteraction<'cached'>;
  public inRawGuild(): this is ContextMenuInteraction<'raw'>;
  private resolveContextMenuOptions(data: APIApplicationCommandInteractionData): CommandInteractionOption<Cached>[];
}

export class DataResolver extends null {
  private constructor();
  public static resolveBase64(data: Base64Resolvable): string;
  public static resolveCode(data: string, regx: RegExp): string;
  public static resolveFile(resource: BufferResolvable | Stream): Promise<Buffer | Stream>;
  public static resolveFileAsBuffer(resource: BufferResolvable | Stream): Promise<Buffer>;
  public static resolveImage(resource: BufferResolvable | Base64Resolvable): Promise<string | null>;
  public static resolveInviteCode(data: InviteResolvable): string;
  public static resolveGuildTemplateCode(data: GuildTemplateResolvable): string;
}

export class DiscordAPIError extends Error {
  private constructor(error: unknown, status: number, request: unknown);
  private static flattenErrors(obj: unknown, key: string): string[];

  public code: number;
  public method: string;
  public path: string;
  public httpStatus: number;
  public requestData: HTTPErrorData;
  public retries: number;
  public captcha: Captcha | null;
  public readonly isBlockedByCloudflare: boolean;
}

export interface Captcha {
  captcha_key: string[];
  captcha_sitekey: string;
  captcha_service: 'hcaptcha';
  captcha_rqdata?: string;
  captcha_rqtoken?: string;
}

export class DMChannel extends TextBasedChannelMixin(Channel, [
  'fetchWebhooks',
  'createWebhook',
  'setRateLimitPerUser',
  'setNSFW',
]) {
  private constructor(client: Client, data?: RawDMChannelData);
  public recipient: User;
  public type: 'DM';
  public flags: Readonly<ChannelFlags>;
  public messageRequest?: boolean;
  public messageRequestTimestamp?: number;
  public fetch(force?: boolean): Promise<this>;
  public acceptMessageRequest(): Promise<this>;
  public cancelMessageRequest(): Promise<this>;
  public sync(): void;
  public ring(): Promise<void>;
  public readonly voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;
  public readonly shard: WebSocketShard;
  public readonly voiceUsers: Collection<Snowflake, User>;
}

export class Emoji extends Base {
  protected constructor(client: Client, emoji: RawEmojiData);
  public animated: boolean | null;
  public readonly createdAt: Date | null;
  public readonly createdTimestamp: number | null;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public id: Snowflake | null;
  public name: string | null;
  public readonly identifier: string;
  public readonly url: string | null;
  public toJSON(): unknown;
  public toString(): string;
}

export class Guild extends AnonymousGuild {
  private constructor(client: Client, data: RawGuildData);
  private _sortedRoles(): Collection<Snowflake, Role>;
  private _sortedChannels(channel: NonThreadGuildBasedChannel): Collection<Snowflake, NonThreadGuildBasedChannel>;

  public readonly afkChannel: VoiceChannel | null;
  public afkChannelId: Snowflake | null;
  public afkTimeout: number;
  public applicationId: Snowflake | null;
  public maxVideoChannelUsers: number | null;
  public maxStageVideoChannelUsers: number | null;
  public approximateMemberCount: number | null;
  public approximatePresenceCount: number | null;
  public autoModerationRules: AutoModerationRuleManager;
  public available: boolean;
  public bans: GuildBanManager;
  public channels: GuildChannelManager;
  public defaultMessageNotifications: DefaultMessageNotificationLevel | number;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public discoverySplash: string | null;
  public emojis: GuildEmojiManager;
  public explicitContentFilter: ExplicitContentFilterLevel;
  public invites: GuildInviteManager;
  public readonly joinedAt: Date;
  public joinedTimestamp: number;
  public large: boolean;
  public maximumMembers: number | null;
  public maximumPresences: number | null;
  /** @deprecated Use {@link GuildMemberManager.me} instead. */
  public readonly me: GuildMember | null;
  public memberCount: number;
  public members: GuildMemberManager;
  public mfaLevel: MFALevel;
  public ownerId: Snowflake;
  public preferredLocale: string;
  public premiumProgressBarEnabled: boolean;
  public premiumTier: PremiumTier;
  public presences: PresenceManager;
  public readonly publicUpdatesChannel: TextChannel | null;
  public publicUpdatesChannelId: Snowflake | null;
  public roles: RoleManager;
  public readonly rulesChannel: TextChannel | null;
  public rulesChannelId: Snowflake | null;
  public readonly safetyAlertsChannel: TextChannel | null;
  public safetyAlertsChannelId: Snowflake | null;
  public scheduledEvents: GuildScheduledEventManager;
  public settings: GuildSettingManager;
  public readonly shard: WebSocketShard;
  public shardId: number;
  public stageInstances: StageInstanceManager;
  public stickers: GuildStickerManager;
  public incidentsData: IncidentActions | null;
  public readonly systemChannel: TextChannel | null;
  public systemChannelFlags: Readonly<SystemChannelFlags>;
  public systemChannelId: Snowflake | null;
  public vanityURLUses: number | null;
  public readonly voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;
  public readonly voiceStates: VoiceStateManager;
  public readonly widgetChannel: TextChannel | NewsChannel | VoiceBasedChannel | ForumChannel | MediaChannel | null;
  public widgetChannelId: Snowflake | null;
  public widgetEnabled: boolean | null;
  public readonly maximumBitrate: number;
  public createTemplate(name: string, description?: string): Promise<GuildTemplate>;
  public delete(): Promise<Guild>;
  public discoverySplashURL(options?: StaticImageURLOptions): string | null;
  public edit(data: GuildEditData, reason?: string): Promise<Guild>;
  public editWelcomeScreen(data: WelcomeScreenEditData): Promise<WelcomeScreen>;
  public equals(guild: Guild): boolean;
  public fetchAuditLogs<T extends GuildAuditLogsResolvable = 'ALL'>(
    options?: GuildAuditLogsFetchOptions<T>,
  ): Promise<GuildAuditLogs<T>>;
  public fetchIntegrations(): Promise<Collection<Snowflake | string, Integration>>;
  public fetchOwner(options?: BaseFetchOptions): Promise<GuildMember>;
  public fetchPreview(): Promise<GuildPreview>;
  public fetchTemplates(): Promise<Collection<GuildTemplate['code'], GuildTemplate>>;
  public fetchVanityData(): Promise<Vanity>;
  public fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;
  public fetchWelcomeScreen(): Promise<WelcomeScreen>;
  public fetchWidget(): Promise<Widget>;
  public fetchWidgetSettings(): Promise<GuildWidgetSettings>;
  public leave(): Promise<Guild>;
  public disableInvites(disabled?: boolean): Promise<Guild>;
  public setIncidentActions(incidentActions: IncidentActionsEditOptions): Promise<IncidentActions>;
  public setAFKChannel(afkChannel: VoiceChannelResolvable | null, reason?: string): Promise<Guild>;
  public setAFKTimeout(afkTimeout: number, reason?: string): Promise<Guild>;
  public setBanner(banner: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;
  /** @deprecated Use {@link GuildChannelManager.setPositions} instead */
  public setChannelPositions(channelPositions: readonly ChannelPosition[]): Promise<Guild>;
  public setDefaultMessageNotifications(
    defaultMessageNotifications: DefaultMessageNotificationLevel | number | null,
    reason?: string,
  ): Promise<Guild>;
  public setDiscoverySplash(
    discoverySplash: BufferResolvable | Base64Resolvable | null,
    reason?: string,
  ): Promise<Guild>;
  public setExplicitContentFilter(
    explicitContentFilter: ExplicitContentFilterLevel | number | null,
    reason?: string,
  ): Promise<Guild>;
  public setIcon(icon: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;
  public setName(name: string, reason?: string): Promise<Guild>;
  public setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild>;
  public setPreferredLocale(preferredLocale: string | null, reason?: string): Promise<Guild>;
  public setPublicUpdatesChannel(publicUpdatesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;
  /** @deprecated Use {@link RoleManager.setPositions} instead */
  public setRolePositions(rolePositions: readonly RolePosition[]): Promise<Guild>;
  public setRulesChannel(rulesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;
  public setSafetyAlertsChannel(safetyAlertsChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;
  public setSplash(splash: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;
  public setSystemChannel(systemChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;
  public setSystemChannelFlags(systemChannelFlags: SystemChannelFlagsResolvable, reason?: string): Promise<Guild>;
  public setVerificationLevel(verificationLevel: VerificationLevel | number | null, reason?: string): Promise<Guild>;
  public setPremiumProgressBarEnabled(enabled?: boolean, reason?: string): Promise<Guild>;
  public setWidgetSettings(settings: GuildWidgetSettingsData, reason?: string): Promise<Guild>;
  public toJSON(): unknown;
  public markAsRead(): Promise<void>;
  public setCommunity(
    stats: boolean,
    publicUpdatesChannel?: GuildTextChannelResolvable,
    rulesChannel?: GuildTextChannelResolvable,
    reason?: string,
  ): Promise<this>;
  public topEmojis(): Promise<Collection<number, GuildEmoji>>;
  public setVanityCode(code?: string): Promise<this>;
}

export class GuildAuditLogs<T extends GuildAuditLogsResolvable = 'ALL'> {
  private constructor(guild: Guild, data: RawGuildAuditLogData);
  private webhooks: Collection<Snowflake, Webhook>;
  private integrations: Collection<Snowflake | string, Integration>;
  private autoModerationRules: Collection<Snowflake, AutoModerationRule>;

  public entries: Collection<Snowflake, GuildAuditLogsEntry<T>>;

  public static Actions: GuildAuditLogsActions;
  public static Targets: GuildAuditLogsTargets;
  public static Entry: typeof GuildAuditLogsEntry;
  public static actionType(action: number): GuildAuditLogsActionType;
  public static build(...args: unknown[]): Promise<GuildAuditLogs>;
  public static targetType(target: number): GuildAuditLogsTarget;
  public toJSON(): unknown;
}

export class GuildAuditLogsEntry<
  TActionRaw extends GuildAuditLogsResolvable = 'ALL',
  TAction = TActionRaw extends keyof GuildAuditLogsIds
    ? GuildAuditLogsIds[TActionRaw]
    : TActionRaw extends null
    ? 'ALL'
    : TActionRaw,
  TActionType extends GuildAuditLogsActionType = TAction extends keyof GuildAuditLogsTypes
    ? GuildAuditLogsTypes[TAction][1]
    : 'ALL',
  TTargetType extends GuildAuditLogsTarget = TAction extends keyof GuildAuditLogsTypes
    ? GuildAuditLogsTypes[TAction][0]
    : 'UNKNOWN',
> {
  private constructor(guild: Guild, data: RawGuildAuditLogEntryData, logs?: GuildAuditLogs);
  public action: TAction;
  public actionType: TActionType;
  public changes: AuditLogChange[];
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public executorId: Snowflake | null;
  public executor: User | null;
  public extra: TAction extends keyof GuildAuditLogsEntryExtraField ? GuildAuditLogsEntryExtraField[TAction] : null;
  public id: Snowflake;
  public reason: string | null;
  public targetId: Snowflake | null;
  public target: TTargetType extends keyof GuildAuditLogsEntryTargetField<TActionType>
    ? GuildAuditLogsEntryTargetField<TActionType>[TTargetType]
    : Role | GuildEmoji | { id: Snowflake } | null;
  public targetType: TTargetType;
  public toJSON(): unknown;
}

export class GuildBan extends Base {
  private constructor(client: Client, data: RawGuildBanData, guild: Guild);
  public guild: Guild;
  public user: User;
  public readonly partial: boolean;
  public reason?: string | null;
  public fetch(force?: boolean): Promise<GuildBan>;
}

export abstract class GuildChannel extends Channel {
  public constructor(guild: Guild, data?: RawGuildChannelData, client?: Client, immediatePatch?: boolean);
  private memberPermissions(member: GuildMember, checkAdmin: boolean): Readonly<Permissions>;
  private rolePermissions(role: Role, checkAdmin: boolean): Readonly<Permissions>;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public readonly calculatedPosition: number;
  public readonly deletable: boolean;
  public guild: Guild;
  public guildId: Snowflake;
  public readonly manageable: boolean;
  public readonly members: Collection<Snowflake, GuildMember>;
  public name: string;
  public readonly parent: CategoryChannel | null;
  public parentId: Snowflake | null;
  public permissionOverwrites: PermissionOverwriteManager;
  public readonly permissionsLocked: boolean | null;
  public readonly position: number;
  public rawPosition: number;
  public type: Exclude<keyof typeof ChannelTypes, 'DM' | 'GROUP_DM' | 'UNKNOWN'>;
  public flags: Readonly<ChannelFlags>;
  public readonly viewable: boolean;
  public clone(options?: GuildChannelCloneOptions): Promise<this>;
  public delete(reason?: string): Promise<this>;
  public edit(data: ChannelData, reason?: string): Promise<this>;
  public equals(channel: GuildChannel): boolean;
  public lockPermissions(): Promise<this>;
  public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<Permissions>;
  public permissionsFor(
    memberOrRole: GuildMemberResolvable | RoleResolvable,
    checkAdmin?: boolean,
  ): Readonly<Permissions> | null;
  public setName(name: string, reason?: string): Promise<this>;
  public setParent(channel: CategoryChannelResolvable | null, options?: SetParentOptions): Promise<this>;
  public setPosition(position: number, options?: SetChannelPositionOptions): Promise<this>;
  public isText(): this is GuildTextBasedChannel;
}

export class GuildEmoji extends BaseGuildEmoji {
  private constructor(client: Client, data: RawGuildEmojiData, guild: Guild);
  private _roles: Snowflake[];

  public readonly deletable: boolean;
  public guild: Guild;
  public author: User | null;
  public readonly roles: GuildEmojiRoleManager;
  public readonly url: string;
  public delete(reason?: string): Promise<GuildEmoji>;
  public edit(data: GuildEmojiEditData, reason?: string): Promise<GuildEmoji>;
  public equals(other: GuildEmoji | unknown): boolean;
  public fetchAuthor(): Promise<User>;
  public setName(name: string, reason?: string): Promise<GuildEmoji>;
}

export class GuildMember extends PartialTextBasedChannel(Base) {
  private constructor(client: Client, data: RawGuildMemberData, guild: Guild);
  private _roles: Snowflake[];
  public avatar: string | null;
  public avatarDecorationData: AvatarDecorationData | null;
  public banner: string | null;
  public readonly bannable: boolean;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public readonly displayColor: number;
  public readonly displayHexColor: HexColorString;
  public readonly displayName: string;
  public flags: Readonly<GuildMemberFlags>;
  public guild: Guild;
  public readonly id: Snowflake;
  public pending: boolean;
  public readonly communicationDisabledUntil: Date | null;
  public communicationDisabledUntilTimestamp: number | null;
  public readonly joinedAt: Date | null;
  public joinedTimestamp: number | null;
  public readonly kickable: boolean;
  public readonly manageable: boolean;
  public readonly moderatable: boolean;
  public nickname: string | null;
  public readonly partial: false;
  public readonly permissions: Readonly<Permissions>;
  public readonly premiumSince: Date | null;
  public premiumSinceTimestamp: number | null;
  public readonly presence: Presence | null;
  public readonly roles: GuildMemberRoleManager;
  public user: User;
  public readonly voice: VoiceState;
  public avatarURL(options?: ImageURLOptions): string | null;
  public avatarDecorationURL(): string | null;
  public bannerURL(options?: ImageURLOptions): string | null;
  public ban(options?: BanOptions): Promise<GuildMember>;
  public disableCommunicationUntil(timeout: DateResolvable | null, reason?: string): Promise<GuildMember>;
  public timeout(timeout: number | null, reason?: string): Promise<GuildMember>;
  public fetch(force?: boolean): Promise<GuildMember>;
  public createDM(force?: boolean): Promise<DMChannel>;
  public deleteDM(): Promise<DMChannel>;
  public displayAvatarURL(options?: ImageURLOptions): string;
  public displayBannerURL(options?: ImageURLOptions): string | null;
  public displayAvatarDecorationURL(): string | null;
  public edit(data: GuildMemberEditData, reason?: string): Promise<GuildMember>;
  public isCommunicationDisabled(): this is GuildMember & {
    communicationDisabledUntilTimestamp: number;
    readonly communicationDisabledUntil: Date;
  };
  public kick(reason?: string): Promise<GuildMember>;
  public permissionsIn(channel: GuildChannelResolvable): Readonly<Permissions>;
  public setNickname(nickname: string | null, reason?: string): Promise<GuildMember>;
  public setFlags(flags: GuildMemberFlagsResolvable): Promise<GuildMember>;
  public toJSON(): unknown;
  public toString(): MemberMention;
  public valueOf(): string;
  public setAvatar(avatar: BufferResolvable | Base64Resolvable | null): Promise<GuildMember>;
  public setBanner(banner: BufferResolvable | Base64Resolvable | null): Promise<GuildMember>;
  public setAboutMe(bio: string | null): Promise<GuildMember>;
}

export class GuildMemberFlags extends BitField<GuildMemberFlagsString> {
  public static FLAGS: Record<GuildMemberFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<GuildMemberFlagsString, number>): number;
}

export class GuildPreview extends Base {
  private constructor(client: Client, data: RawGuildPreviewData);
  public approximateMemberCount: number;
  public approximatePresenceCount: number;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public description: string | null;
  public discoverySplash: string | null;
  public emojis: Collection<Snowflake, GuildPreviewEmoji>;
  public stickers: Collection<Snowflake, Sticker>;
  public features: GuildFeatures[];
  public icon: string | null;
  public id: Snowflake;
  public name: string;
  public splash: string | null;
  public discoverySplashURL(options?: StaticImageURLOptions): string | null;
  public iconURL(options?: ImageURLOptions): string | null;
  public splashURL(options?: StaticImageURLOptions): string | null;
  public fetch(): Promise<GuildPreview>;
  public toJSON(): unknown;
  public toString(): string;
}

export class GuildScheduledEvent<S extends GuildScheduledEventStatus = GuildScheduledEventStatus> extends Base {
  private constructor(client: Client, data: RawGuildScheduledEventData);
  public id: Snowflake;
  public guildId: Snowflake;
  public channelId: Snowflake | null;
  public creatorId: Snowflake | null;
  public name: string;
  public description: string | null;
  public scheduledStartTimestamp: number | null;
  public scheduledEndTimestamp: number | null;
  public privacyLevel: GuildScheduledEventPrivacyLevel;
  public status: S;
  public entityType: GuildScheduledEventEntityType;
  public entityId: Snowflake | null;
  public entityMetadata: GuildScheduledEventEntityMetadata;
  public userCount: number | null;
  public creator: User | null;
  public recurrenceRule: GuildScheduledEventRecurrenceRule | null;
  public readonly createdTimestamp: number;
  public readonly createdAt: Date;
  public readonly scheduledStartAt: Date;
  public readonly scheduledEndAt: Date | null;
  public readonly channel: VoiceChannel | StageChannel | null;
  public readonly guild: Guild | null;
  public readonly url: string;
  public readonly image: string | null;
  public readonly partial: false;
  public coverImageURL(options?: StaticImageURLOptions): string | null;
  public createInviteURL(options?: CreateGuildScheduledEventInviteURLOptions): Promise<string>;
  public edit<T extends GuildScheduledEventSetStatusArg<S>>(
    options: GuildScheduledEventEditOptions<S, T>,
  ): Promise<GuildScheduledEvent<T>>;
  public fetch(force?: boolean): Promise<GuildScheduledEvent<S>>;
  public delete(): Promise<GuildScheduledEvent<S>>;
  public setName(name: string, reason?: string): Promise<GuildScheduledEvent<S>>;
  public setScheduledStartTime(scheduledStartTime: DateResolvable, reason?: string): Promise<GuildScheduledEvent<S>>;
  public setScheduledEndTime(scheduledEndTime: DateResolvable, reason?: string): Promise<GuildScheduledEvent<S>>;
  public setDescription(description: string, reason?: string): Promise<GuildScheduledEvent<S>>;
  public setStatus<T extends GuildScheduledEventSetStatusArg<S>>(
    status: T,
    reason?: string,
  ): Promise<GuildScheduledEvent<T>>;
  public setLocation(location: string, reason?: string): Promise<GuildScheduledEvent<S>>;
  public fetchSubscribers<T extends FetchGuildScheduledEventSubscribersOptions>(
    options?: T,
  ): Promise<GuildScheduledEventManagerFetchSubscribersResult<T>>;
  public toString(): string;
  public isActive(): this is GuildScheduledEvent<'ACTIVE'>;
  public isCanceled(): this is GuildScheduledEvent<'CANCELED'>;
  public isCompleted(): this is GuildScheduledEvent<'COMPLETED'>;
  public isScheduled(): this is GuildScheduledEvent<'SCHEDULED'>;
}

export interface GuildScheduledEventRecurrenceRule {
  startTimestamp: number;
  get startAt(): Date;
  endTimestamp: number | null;
  get endAt(): Date | null;
  frequency: GuildScheduledEventRecurrenceRuleFrequency;
  interval: number;
  byWeekday: readonly GuildScheduledEventRecurrenceRuleWeekday[] | null;
  byNWeekday: readonly GuildScheduledEventRecurrenceRuleNWeekday[] | null;
  byMonth: readonly GuildScheduledEventRecurrenceRuleMonth[] | null;
  byMonthDay: readonly number[] | null;
  byYearDay: readonly number[] | null;
  count: number | null;
}

export interface GuildScheduledEventRecurrenceRuleNWeekday {
  n: number;
  day: GuildScheduledEventRecurrenceRuleWeekday;
}

export class GuildTemplate extends Base {
  private constructor(client: Client, data: RawGuildTemplateData);
  public readonly createdTimestamp: number;
  public readonly updatedTimestamp: number;
  public readonly url: string;
  public code: string;
  public name: string;
  public description: string | null;
  public usageCount: number;
  public creator: User;
  public creatorId: Snowflake;
  public createdAt: Date;
  public updatedAt: Date;
  public guild: Guild | null;
  public guildId: Snowflake;
  public serializedGuild: APITemplateSerializedSourceGuild;
  public unSynced: boolean | null;
  public createGuild(name: string, icon?: BufferResolvable | Base64Resolvable): Promise<Guild>;
  public delete(): Promise<GuildTemplate>;
  public edit(options?: EditGuildTemplateOptions): Promise<GuildTemplate>;
  public sync(): Promise<GuildTemplate>;
  public static GUILD_TEMPLATES_PATTERN: RegExp;
}

export class GuildPreviewEmoji extends BaseGuildEmoji {
  private constructor(client: Client, data: RawGuildEmojiData, guild: GuildPreview);
  public guild: GuildPreview;
  public roles: Snowflake[];
}

export class HTTPError extends Error {
  private constructor(message: string, name: string, code: number, request: unknown);
  public code: number;
  public method: string;
  public name: string;
  public path: string;
  public requestData: HTTPErrorData;
}

// tslint:disable-next-line:no-empty-interface - Merge RateLimitData into RateLimitError to not have to type it again
export interface RateLimitError extends RateLimitData {}
export class RateLimitError extends Error {
  private constructor(data: RateLimitData);
  public name: 'RateLimitError';
}

export class Integration extends Base {
  private constructor(client: Client, data: RawIntegrationData, guild: Guild);
  public account: IntegrationAccount;
  public application: IntegrationApplication | null;
  public enabled: boolean;
  public expireBehavior: number | undefined;
  public expireGracePeriod: number | undefined;
  public guild: Guild;
  public id: Snowflake | string;
  public name: string;
  public role: Role | undefined;
  public enableEmoticons: boolean | null;
  public readonly roles: Collection<Snowflake, Role>;
  public syncedAt: number | undefined;
  public syncing: boolean | undefined;
  public type: IntegrationType;
  public user: User | null;
  public subscriberCount: number | null;
  public revoked: boolean | null;
  public delete(reason?: string): Promise<Integration>;
}

export class IntegrationApplication extends Application {
  private constructor(client: Client, data: RawIntegrationApplicationData);
  public bot: User | PartialUser | null;
  public termsOfServiceURL: string | null;
  public privacyPolicyURL: string | null;
  public rpcOrigins: string[];
  /** @deprecated This property is no longer being sent by the API. */
  public summary: string | null;
  public hook: boolean | null;
  public cover: string | null;
  public verifyKey: string | null;
}

export class Intents extends BitField<IntentsString> {
  public static FLAGS: Record<IntentsString, number>;
  public static resolve(bit?: BitFieldResolvable<IntentsString, number>): number;
  public static ALL: number;
}

export type CacheType = 'cached' | 'raw' | undefined;

export type CacheTypeReducer<
  State extends CacheType,
  CachedType,
  RawType = CachedType,
  PresentType = CachedType | RawType,
  Fallback = PresentType | null,
> = [State] extends ['cached']
  ? CachedType
  : [State] extends ['raw']
  ? RawType
  : [State] extends ['raw' | 'cached']
  ? PresentType
  : Fallback;

export class Interaction<Cached extends CacheType = CacheType> extends Base {
  // This a technique used to brand different cached types. Or else we'll get `never` errors on typeguard checks.
  private readonly _cacheType: Cached;
  protected constructor(client: Client, data: RawInteractionData);
  public applicationId: Snowflake;
  public readonly channel: CacheTypeReducer<
    Cached,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  >;
  public channelId: Snowflake | null;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public readonly guild: CacheTypeReducer<Cached, Guild, null>;
  public guildId: CacheTypeReducer<Cached, Snowflake>;
  public id: Snowflake;
  public member: CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember>;
  public readonly token: string;
  public type: InteractionType;
  public user: User;
  public version: number;
  public appPermissions: Readonly<Permissions> | null;
  public memberPermissions: CacheTypeReducer<Cached, Readonly<Permissions>>;
  public locale: string;
  public guildLocale: CacheTypeReducer<Cached, string, string, string>;
  public inGuild(): this is Interaction<'raw' | 'cached'>;
  public inCachedGuild(): this is Interaction<'cached'>;
  public inRawGuild(): this is Interaction<'raw'>;
  public isApplicationCommand(): this is BaseCommandInteraction<Cached>;
  public isButton(): this is ButtonInteraction<Cached>;
  public isCommand(): this is CommandInteraction<Cached>;
  public isAutocomplete(): this is AutocompleteInteraction<Cached>;
  public isContextMenu(): this is ContextMenuInteraction<Cached>;
  public isUserContextMenu(): this is UserContextMenuInteraction<Cached>;
  public isMessageContextMenu(): this is MessageContextMenuInteraction<Cached>;
  public isMessageComponent(): this is MessageComponentInteraction<Cached>;
  public isModalSubmit(): this is ModalSubmitInteraction<Cached>;
  public isSelectMenu(): this is SelectMenuInteraction<Cached>;
  public isRepliable(): this is this & InteractionResponseFields<Cached>;
}

export class InteractionCollector<T extends Interaction> extends Collector<Snowflake, T> {
  public constructor(client: Client, options?: InteractionCollectorOptions<T>);
  private _handleMessageDeletion(message: Message): void;
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;
  private _handleGuildDeletion(guild: Guild): void;

  public channelId: Snowflake | null;
  public componentType: MessageComponentType | null;
  public readonly endReason: string | null;
  public guildId: Snowflake | null;
  public interactionType: InteractionType | null;
  public messageId: Snowflake | null;
  public options: InteractionCollectorOptions<T>;
  public total: number;
  public users: Collection<Snowflake, User>;

  public collect(interaction: Interaction): Snowflake;
  public empty(): void;
  public dispose(interaction: Interaction): Snowflake;
  public on(event: 'collect' | 'dispose', listener: (interaction: T) => Awaitable<void>): this;
  public on(event: 'end', listener: (collected: Collection<Snowflake, T>, reason: string) => Awaitable<void>): this;
  public on(event: string, listener: (...args: any[]) => Awaitable<void>): this;

  public once(event: 'collect' | 'dispose', listener: (interaction: T) => Awaitable<void>): this;
  public once(event: 'end', listener: (collected: Collection<Snowflake, T>, reason: string) => Awaitable<void>): this;
  public once(event: string, listener: (...args: any[]) => Awaitable<void>): this;
}

export class InteractionWebhook extends PartialWebhookMixin() {
  public constructor(client: Client, id: Snowflake, token: string);
  public token: string;
  public send(options: string | MessagePayload | InteractionReplyOptions): Promise<Message | APIMessage>;
}

export class Invite extends Base {
  private constructor(client: Client, data: RawInviteData);
  public channel?: NonThreadGuildBasedChannel | GroupDMChannel;
  public channelId?: Snowflake;
  public code: string;
  public readonly deletable: boolean;
  public readonly createdAt: Date | null;
  public createdTimestamp: number | null;
  public readonly expiresAt: Date | null;
  public readonly expiresTimestamp: number | null;
  public guild: InviteGuild | Guild | null;
  public inviter: User | null;
  public inviterId: Snowflake | null;
  public maxAge: number | null;
  public maxUses: number | null;
  public memberCount: number | null;
  public presenceCount: number | null;
  public type: InviteTypes | null;
  public targetApplication: IntegrationApplication | null;
  public targetUser: User | null;
  public targetType: InviteTargetTypes | null;
  public temporary: boolean | null;
  public readonly url: string;
  public uses: number | null;
  public delete(reason?: string): Promise<Invite>;
  public toJSON(): unknown;
  public toString(): string;
  public static INVITES_PATTERN: RegExp;
  public stageInstance: InviteStageInstance | null;
  public guildScheduledEvent: GuildScheduledEvent | null;
  public flags: Readonly<InviteFlags>;
}

export class InviteStageInstance extends Base {
  private constructor(client: Client, data: RawInviteStageInstance, channelId: Snowflake, guildId: Snowflake);
  public channelId: Snowflake;
  public guildId: Snowflake;
  public members: Collection<Snowflake, GuildMember>;
  public topic: string;
  public participantCount: number;
  public speakerCount: number;
  public readonly channel: StageChannel | null;
  public readonly guild: Guild | null;
}

export class InviteGuild extends AnonymousGuild {
  private constructor(client: Client, data: RawInviteGuildData);
  public welcomeScreen: WelcomeScreen | null;
}

export class LimitedCollection<K, V> extends Collection<K, V> {
  public constructor(options?: LimitedCollectionOptions<K, V>, iterable?: Iterable<readonly [K, V]>);
  public maxSize: number;
  public keepOverLimit: ((value: V, key: K, collection: this) => boolean) | null;
  /** @deprecated Use Global Sweepers instead */
  public interval: any | null;
  /** @deprecated Use Global Sweepers instead */
  public sweepFilter: SweepFilter<K, V> | null;

  /** @deprecated Use `Sweepers.filterByLifetime` instead */
  public static filterByLifetime<K, V>(options?: LifetimeFilterOptions<K, V>): SweepFilter<K, V>;
}

export type MessageCollectorOptionsParams<
  T extends MessageComponentInteractableResolvable,
  Cached extends boolean = boolean,
> = {
  componentType?: T;
} & MessageComponentCollectorOptions<MappedInteractionTypes<Cached>[T]>;

export type MessageChannelCollectorOptionsParams<
  T extends MessageComponentInteractableResolvable,
  Cached extends boolean = boolean,
> = { componentType?: T } & MessageChannelComponentCollectorOptions<MappedInteractionTypes<Cached>[T]>;

export type AwaitMessageCollectorOptionsParams<
  T extends MessageComponentInteractableResolvable,
  Cached extends boolean = boolean,
> = { componentType?: T } & Pick<
  InteractionCollectorOptions<MappedInteractionTypes<Cached>[T]>,
  keyof AwaitMessageComponentOptions<any>
>;

export interface StringMappedInteractionTypes<Cached extends CacheType = CacheType> {
  BUTTON: ButtonInteraction<Cached>;
  STRING_SELECT: SelectMenuInteraction<Cached>;
  USER_SELECT: SelectMenuInteraction<Cached>;
  ROLE_SELECT: SelectMenuInteraction<Cached>;
  MENTIONABLE_SELECT: SelectMenuInteraction<Cached>;
  CHANNEL_SELECT: SelectMenuInteraction<Cached>;
  ACTION_ROW: MessageComponentInteraction<Cached>;
}

export type WrapBooleanCache<T extends boolean> = If<T, 'cached', CacheType>;

export type MappedInteractionTypes<Cached extends boolean = boolean> = EnumValueMapped<
  typeof MessageComponentInteractables,
  {
    BUTTON: ButtonInteraction<WrapBooleanCache<Cached>>;
    STRING_SELECT: StringSelectInteraction<WrapBooleanCache<Cached>>;
    USER_SELECT: UserSelectInteraction<WrapBooleanCache<Cached>>;
    ROLE_SELECT: RoleSelectInteraction<WrapBooleanCache<Cached>>;
    MENTIONABLE_SELECT: MentionableSelectInteraction<WrapBooleanCache<Cached>>;
    CHANNEL_SELECT: ChannelSelectInteraction<WrapBooleanCache<Cached>>;
    ACTION_ROW: MessageComponentInteraction<WrapBooleanCache<Cached>>;
    TEXT_INPUT: ModalSubmitInteraction<WrapBooleanCache<Cached>>;
  }
>;

export class Message<Cached extends boolean = boolean> extends Base {
  private readonly _cacheType: Cached;
  private constructor(client: Client, data: RawMessageData);
  private _patch(data: RawPartialMessageData | RawMessageData): void;

  public activity: MessageActivity | null;
  public applicationId: Snowflake | null;
  public attachments: Collection<Snowflake, MessageAttachment>;
  public author: User;
  public get bulkDeletable(): boolean;
  public readonly channel: If<Cached, GuildTextBasedChannel, TextBasedChannel>;
  public channelId: Snowflake;
  public readonly cleanContent: string;
  public components: TopLevelComponent[];
  public content: string;
  public readonly createdAt: Date;
  public createdTimestamp: number;
  public readonly crosspostable: boolean;
  public readonly deletable: boolean;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public readonly editable: boolean;
  public readonly editedAt: Date | null;
  public editedTimestamp: number | null;
  public embeds: MessageEmbed[];
  public groupActivityApplication: Application | null;
  public guildId: If<Cached, Snowflake>;
  public readonly guild: If<Cached, Guild>;
  public readonly hasThread: boolean;
  public id: Snowflake;
  public interaction: MessageInteraction | null;
  public readonly member: GuildMember | null;
  public mentions: MessageMentions;
  public nonce: string | number | null;
  public readonly partial: false;
  public readonly pinnable: boolean;
  public pinned: boolean;
  public reactions: ReactionManager;
  public stickers: Collection<Snowflake, Sticker>;
  public system: boolean;
  public readonly thread: ThreadChannel | null;
  public tts: boolean;
  public type: MessageType;
  public readonly url: string;
  public webhookId: Snowflake | null;
  public poll: Poll | null;
  public call: MessageCall | null;
  public flags: Readonly<MessageFlags>;
  public reference: MessageReference | null;
  public messageSnapshots: Collection<Snowflake, MessageSnapshot>;
  public position: number | null;
  public awaitReactions(options?: AwaitReactionsOptions): Promise<Collection<Snowflake | string, MessageReaction>>;
  public createReactionCollector(options?: ReactionCollectorOptions): ReactionCollector;
  public delete(): Promise<Message>;
  public edit(content: string | MessageEditOptions | MessagePayload): Promise<Message>;
  public equals(message: Message, rawData: unknown): boolean;
  public fetchReference(): Promise<Message>;
  public fetchWebhook(): Promise<Webhook>;
  public crosspost(): Promise<Message>;
  public fetch(force?: boolean): Promise<Message>;
  public pin(reason?: string): Promise<Message>;
  public react(emoji: EmojiIdentifierResolvable, burst?: boolean): Promise<MessageReaction>;
  public removeAttachments(): Promise<Message>;
  public reply(options: string | MessagePayload | ReplyMessageOptions): Promise<Message>;
  public forward(channel: TextBasedChannelResolvable): Promise<Message>;
  public resolveComponent(customId: string): MessageActionRowComponent | null;
  public startThread(options: StartThreadOptions): Promise<ThreadChannel>;
  public suppressEmbeds(suppress?: boolean): Promise<Message>;
  public toJSON(): unknown;
  public toString(): string;
  public unpin(reason?: string): Promise<Message>;
  public inGuild(): this is Message<true> & this;

  public readonly isMessage: true;
  public clickButton(button: string): Promise<Message | Modal>;
  public selectMenu(
    menu: 0 | 1 | 2 | 3 | 4 | string,
    vales: (UserResolvable | RoleResolvable | ChannelResolvable | string)[],
  ): Promise<Message | Modal>;
  public markUnread(): Promise<void>;
  public markRead(): Promise<void>;
  public report(breadcrumbs: number[], elements?: object): Promise<{ report_id: Snowflake }>;
  public avoidViolation(message: string): Promise<void>;
  public vote(...ids: number[]): Promise<void>;
}

export class CallState extends Base {
  private constructor(client: Client, data: any);
  public channelId: Snowflake;
  public region: string;
  public readonly channel?: DMChannel | GroupDMChannel;
  public readonly ringing: Collection<Snowflake, User>;
  public setRTCRegion(): Promise<void>;
}
export class MessageActionRow<
  T extends MessageActionRowComponent | ModalActionRowComponent = MessageActionRowComponent,
  U = T extends ModalActionRowComponent ? ModalActionRowComponentResolvable : MessageActionRowComponentResolvable,
  V = T extends ModalActionRowComponent
    ? APIActionRowComponent<APIModalActionRowComponent>
    : APIActionRowComponent<APIMessageActionRowComponent>,
> extends BaseMessageComponent {
  // tslint:disable-next-line:ban-ts-ignore
  // @ts-ignore (TS:2344, Caused by TypeScript 4.8)
  // Fixed in DiscordJS >= 14.x / DiscordApiTypes >= 0.37.x, ignoring the type error here.
  public constructor(data?: MessageActionRow<T> | MessageActionRowOptions<U> | V);
  public type: 'ACTION_ROW';
  public components: T[];
  public addComponents(...components: U[] | U[][]): this;
  public setComponents(...components: U[] | U[][]): this;
  public spliceComponents(index: number, deleteCount: number, ...components: U[] | U[][]): this;
  public toJSON(): V;
}

export class MessageAttachment {
  public constructor(attachment: BufferResolvable | Stream, name?: string, data?: RawMessageAttachmentData);

  public attachment: BufferResolvable | Stream;
  public contentType: string | null;
  public description: string | null;
  public duration: number | null;
  public ephemeral: boolean;
  public flags: Readonly<AttachmentFlags>;
  public height: number | null;
  public id: Snowflake;
  public name: string | null;
  public proxyURL: string;
  public size: number;
  public readonly spoiler: boolean;
  public title: string | null;
  public url: string;
  public waveform: string | null;
  public width: number | null;
  public setDescription(description: string): this;
  public setFile(attachment: BufferResolvable | Stream, name?: string): this;
  public setName(name: string): this;
  public setSpoiler(spoiler?: boolean): this;
  public toJSON(): unknown;
}

export class AttachmentFlags extends BitField<AttachmentFlagsString> {
  public static FLAGS: Record<AttachmentFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<AttachmentFlagsString, number>): number;
}

export type AttachmentFlagsString = 'IS_REMIX';

export class MessageButton extends BaseMessageComponent {
  public constructor(data?: MessageButton | MessageButtonOptions | APIButtonComponent);
  public customId: string | null;
  public disabled: boolean;
  public emoji: APIPartialEmoji | null;
  public label: string | null;
  public style: MessageButtonStyle | null;
  public type: 'BUTTON';
  public url: string | null;
  public setCustomId(customId: string): this;
  public setDisabled(disabled?: boolean): this;
  public setEmoji(emoji: EmojiIdentifierResolvable): this;
  public setLabel(label: string): this;
  public setStyle(style: MessageButtonStyleResolvable): this;
  public setURL(url: string): this;
  public toJSON(): APIButtonComponent;
  private static resolveStyle(style: MessageButtonStyleResolvable): MessageButtonStyle;
}

export class UnfurledMediaItem {
  public constructor(data?: UnfurledMediaItem | APIUnfurledMediaItem);
  public url: string | null;
  public toJSON(): APIUnfurledMediaItem;
}

export class MediaGalleryItem {
  public constructor(data?: MediaGalleryItem | APIMediaGalleryItem);
  public media: UnfurledMediaItem;
  public description: string | null;
  public spoiler: boolean;
  public toJSON(): APIMediaGalleryItem;
}

export class MediaGalleryComponent extends BaseMessageComponent {
  public constructor(data?: MediaGalleryComponent | APIMediaGalleryComponent);
  public items: MediaGalleryItem[];
  public toJSON(): APIMediaGalleryComponent;
}

export class FileComponent extends BaseMessageComponent {
  public constructor(data?: FileComponent | APIFileComponent);
  public file: UnfurledMediaItem;
  public spoiler: boolean;
  public toJSON(): APIFileComponent;
}

export class SeparatorComponent extends BaseMessageComponent {
  public constructor(data?: SeparatorComponent | APISeparatorComponent);
  public spacing: SeparatorSpacingSizes;
  public divider: boolean;
  public toJSON(): APISeparatorComponent;
}

export class TextDisplayComponent extends BaseMessageComponent {
  public constructor(data?: TextDisplayComponent | APITextDisplayComponent);
  public content: string | null;
  public toJSON(): APITextDisplayComponent;
}

export class ThumbnailComponent extends BaseMessageComponent {
  public constructor(data?: ThumbnailComponent | APIThumbnailComponent);
  public media: UnfurledMediaItem;
  public description: string | null;
  public spoiler: boolean;
}

export class SectionComponent<
  AccessoryType extends MessageButton | ThumbnailComponent = MessageButton | ThumbnailComponent,
> extends BaseMessageComponent {
  public constructor(data?: SectionComponent<AccessoryType> | APISectionComponent);
  public components: TextDisplayComponent[];
  public accessory: AccessoryType[];
  public toJSON(): APISectionComponent;
}

export type ComponentInContainer =
  | MessageActionRow
  | FileComponent
  | MediaGalleryComponent
  | SectionComponent
  | SeparatorComponent
  | TextDisplayComponent;

export class ContainerComponent extends BaseMessageComponent {
  public constructor(data?: ComponentInContainer | APIContainerComponent);
  public components: ComponentInContainer[];
  public accentColor: number | null;
  public readonly hexAccentColor: HexColorString | null;
  public spoiler: boolean;
  public toJSON(): APIContainerComponent;
}

export class MessageCollector extends Collector<Snowflake, Message> {
  public constructor(channel: TextBasedChannel, options?: MessageCollectorOptions);
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;
  private _handleGuildDeletion(guild: Guild): void;

  public channel: TextBasedChannel;
  public readonly endReason: string | null;
  public options: MessageCollectorOptions;
  public received: number;

  public collect(message: Message): Snowflake | null;
  public dispose(message: Message): Snowflake | null;
}

export class MessageComponentInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  protected constructor(client: Client, data: RawMessageComponentInteractionData);
  public readonly component: CacheTypeReducer<
    Cached,
    MessageActionRowComponent,
    APIMessageActionRowComponent,
    MessageActionRowComponent | APIMessageActionRowComponent,
    MessageActionRowComponent | APIMessageActionRowComponent
  >;
  public componentType: Exclude<MessageComponentType, 'ACTION_ROW'>;
  public customId: string;
  public channelId: Snowflake;
  public deferred: boolean;
  public ephemeral: boolean | null;
  public message: GuildCacheMessage<Cached>;
  public replied: boolean;
  public webhook: InteractionWebhook;
  public awaitModalSubmit(
    options: AwaitModalSubmitOptions<ModalSubmitInteraction>,
  ): Promise<ModalSubmitInteraction<Cached>>;
  public inGuild(): this is MessageComponentInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is MessageComponentInteraction<'cached'>;
  public inRawGuild(): this is MessageComponentInteraction<'raw'>;
  public deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options?: InteractionDeferReplyOptions): Promise<void>;
  public deferUpdate(options: InteractionDeferUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferUpdate(options?: InteractionDeferUpdateOptions): Promise<void>;
  public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;
  public editReply(options: string | MessagePayload | InteractionEditReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public fetchReply(message?: MessageResolvable | '@original'): Promise<GuildCacheMessage<Cached>>;
  public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;
  public showModal(modal: Modal | ModalOptions): Promise<void>;
  public update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public update(options: string | MessagePayload | InteractionUpdateOptions): Promise<void>;

  public static resolveType(type: MessageComponentTypeResolvable): MessageComponentType;
}

export class MessageContextMenuInteraction<
  Cached extends CacheType = CacheType,
> extends ContextMenuInteraction<Cached> {
  public readonly targetMessage: NonNullable<CommandInteractionOption<Cached>['message']>;
  public inGuild(): this is MessageContextMenuInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is MessageContextMenuInteraction<'cached'>;
  public inRawGuild(): this is MessageContextMenuInteraction<'raw'>;
}

export class MessageEmbed {
  private _fieldEquals(field: EmbedField, other: EmbedField): boolean;

  public constructor(data?: MessageEmbed | MessageEmbedOptions | APIEmbed);
  public author: MessageEmbedAuthor | null;
  public color: number | null;
  public readonly createdAt: Date | null;
  public description: string | null;
  public fields: EmbedField[];
  public footer: MessageEmbedFooter | null;
  public readonly hexColor: HexColorString | null;
  public image: MessageEmbedImage | null;
  public readonly length: number;
  public provider: MessageEmbedProvider | null;
  public thumbnail: MessageEmbedThumbnail | null;
  public timestamp: number | null;
  public title: string | null;
  /** @deprecated */
  public type: string;
  public url: string | null;
  public readonly video: MessageEmbedVideo | null;
  /** @deprecated This method is a wrapper for {@link MessageEmbed#addFields}. Use that instead. */
  public addField(name: string, value: string, inline?: boolean): this;
  public addFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): this;
  public setFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): this;
  public setAuthor(options: EmbedAuthorData | null): this;
  /** @deprecated Supply a lone object of interface {@link EmbedAuthorData} instead. */
  public setAuthor(name: string, iconURL?: string, url?: string): this;
  public setColor(color: ColorResolvable): this;
  public setDescription(description: string): this;
  public setFooter(options: EmbedFooterData | null): this;
  /** @deprecated Supply a lone object of interface {@link EmbedFooterData} instead. */
  public setFooter(text: string, iconURL?: string): this;
  public setImage(url: string): this;
  public setThumbnail(url: string): this;
  public setTimestamp(timestamp?: Date | number | null): this;
  public setTitle(title: string): this;
  public setURL(url: string): this;
  public spliceFields(index: number, deleteCount: number, ...fields: EmbedFieldData[] | EmbedFieldData[][]): this;
  public equals(embed: MessageEmbed | APIEmbed): boolean;
  public toJSON(): APIEmbed;

  public static normalizeField(name: string, value: string, inline?: boolean): Required<EmbedFieldData>;
  public static normalizeFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): Required<EmbedFieldData>[];
}

export interface WebEmbedOptions {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: Date | number;
  color?: ColorResolvable;
  fields?: EmbedFieldData[];
  author?: Partial<MessageEmbedAuthor> & { icon_url?: string; proxy_icon_url?: string };
  thumbnail?: Partial<MessageEmbedThumbnail> & { proxy_url?: string };
  image?: Partial<MessageEmbedImage> & { proxy_url?: string };
  video?: Partial<MessageEmbedVideo> & { proxy_url?: string };
  footer?: Partial<MessageEmbedFooter> & { icon_url?: string; proxy_icon_url?: string };
  imageType?: 'thumbnail' | 'image';
  redirect?: string;
}

export class WebEmbed {
  public constructor(data?: WebEmbedOptions);
  public author: MessageEmbedAuthor | null;
  public baseURL: string | undefined;
  public color: number | null;
  public description: string | null;
  public image: MessageEmbedImage | null;
  public provider: MessageEmbedProvider | null;
  public title: string | null;
  public url: string | null;
  public video: MessageEmbedVideo | null;
  public imageType: 'thumbnail' | 'image';
  public redirect?: string;
  public setAuthor(options: EmbedAuthorData | null): this;
  public setColor(color: ColorResolvable): this;
  public setDescription(description: string): this;
  public setImage(url: string): this;
  public setThumbnail(url: string): this;
  public setVideo(url: string): this;
  public setTitle(title: string): this;
  public setURL(url: string): this;
  public setProvider(options: MessageEmbedProvider | null): this;
  public setRedirect(url: string): this;
  public toString(): string;
  public static hiddenEmbed: string;
}

export class SessionManager extends CachedManager<string, Session, any> {
  private constructor(client: Client, iterable: Iterable<any>);
  public currentSessionIdHash: string | null;
  public readonly currentSession: Session | null;
  public fetch(): Promise<Collection<string, Session>>;
  public logoutAllDevices(): Promise<void>;
}

export class BillingManager extends BaseManager {
  constructor(client: Client);
  public paymentSources: Collection<Snowflake, object>;
  public fetchPaymentSources(): Promise<Collection<Snowflake, object>>;
  public guildBoosts: Collection<Snowflake, GuildBoost>;
  public fetchGuildBoosts(): Promise<Collection<Snowflake, GuildBoost>>;
  public currentSubscription: Collection<Snowflake, object>;
  public fetchCurrentSubscription(): Promise<Collection<Snowflake, object>>;
}

export class Session extends Base {
  constructor(client: Client);
  public id?: string;
  public clientInfo?: SessionClientInfo;
  public approxLastUsedTime: string;
  public readonly createdTimestamp: number;
  public readonly createdAt: Date;
  public logout(): Promise<void>;
}

export interface SessionClientInfo {
  location?: string;
  platform?: string;
  os?: string;
}

export class GuildBoost extends Base {
  constructor(client: Client, data: object);
  public id: Snowflake;
  public guildId?: Snowflake;
  public readonly guild: Guild | null;
  public subscriptionId: Snowflake;
  public premiumGuildSubscriptionId?: Snowflake;
  public ended?: boolean;
  public canceled: boolean;
  public cooldownEndsAt: Date;
  public unsubscribe(): Promise<this>;
  public subscribe(guild: GuildResolvable): Promise<this>;
}

export class MessageFlags extends BitField<MessageFlagsString> {
  public static FLAGS: Record<MessageFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<MessageFlagsString, number>): number;
}

export class MessageMentions {
  private constructor(
    message: Message,
    users: APIUser[] | Collection<Snowflake, User>,
    roles: Snowflake[] | Collection<Snowflake, Role>,
    everyone: boolean,
    repliedUser?: APIUser | User,
  );
  private _channels: Collection<Snowflake, AnyChannel> | null;
  private readonly _content: string;
  private _members: Collection<Snowflake, GuildMember> | null;
  private _parsedUsers: Collection<Snowflake, User> | null;

  public readonly channels: Collection<Snowflake, AnyChannel>;
  public readonly client: Client;
  public everyone: boolean;
  public readonly guild: Guild;
  public has(data: UserResolvable | RoleResolvable | ChannelResolvable, options?: MessageMentionsHasOptions): boolean;
  public readonly members: Collection<Snowflake, GuildMember> | null;
  public readonly parsedUsers: Collection<Snowflake, User>;
  public repliedUser: User | null;
  public roles: Collection<Snowflake, Role>;
  public users: Collection<Snowflake, User>;
  public crosspostedChannels: Collection<Snowflake, CrosspostedChannel>;
  public toJSON(): unknown;

  public static CHANNELS_PATTERN: RegExp;
  public static EVERYONE_PATTERN: RegExp;
  public static ROLES_PATTERN: RegExp;
  public static USERS_PATTERN: RegExp;
}

export class MessagePayload {
  public constructor(target: MessageTarget, options: MessageOptions | WebhookMessageOptions);
  public data: RawMessagePayloadData | null;
  public readonly isUser: boolean;
  public readonly isWebhook: boolean;
  public readonly isMessage: boolean;
  public readonly isMessageManager: boolean;
  public readonly isInteraction: boolean;
  public files: HTTPAttachmentData[] | null;
  public options: MessageOptions | WebhookMessageOptions;
  public target: MessageTarget;

  public static create(
    target: MessageTarget,
    options: string | MessageOptions | WebhookMessageOptions,
    extra?: MessageOptions | WebhookMessageOptions,
  ): MessagePayload;
  public static resolveFile(
    fileLike: BufferResolvable | Stream | FileOptions | MessageAttachment,
  ): Promise<HTTPAttachmentData>;

  public makeContent(): string | undefined;
  public resolveData(): this;
  public resolveFiles(): Promise<this>;
}

export class MessageReaction {
  private constructor(client: Client, data: RawMessageReactionData, message: Message);
  private _emoji: GuildEmoji | ReactionEmoji;

  public burstColors: string[] | null;
  public readonly client: Client<true>;
  public count: number;
  public countDetails: ReactionCountDetailsData;
  public readonly emoji: GuildEmoji | ReactionEmoji;
  public me: boolean;
  public meBurst: boolean;
  public message: Message | PartialMessage;
  public readonly partial: false;
  public users: ReactionUserManager;
  public remove(): Promise<MessageReaction>;
  public fetch(): Promise<MessageReaction>;
  public toJSON(): unknown;
}

export interface ReactionCountDetailsData {
  burst: number;
  normal: number;
}
export interface MessageReactionEventDetails {
  type: ReactionType;
  burst: boolean;
}

export class MessageSelectMenu extends BaseMessageComponent {
  public constructor(data?: MessageSelectMenu | MessageSelectMenuOptions | APISelectMenuComponent);
  public channelTypes: ChannelTypes[];
  public customId: string | null;
  public disabled: boolean;
  public maxValues: number | null;
  public minValues: number | null;
  public options: MessageSelectOption[];
  public placeholder: string | null;
  public type: SelectMenuComponentType;
  public addOptions(...options: MessageSelectOptionData[] | MessageSelectOptionData[][]): this;
  public setOptions(...options: MessageSelectOptionData[] | MessageSelectOptionData[][]): this;
  public setCustomId(customId: string): this;
  public setDisabled(disabled?: boolean): this;
  public setMaxValues(maxValues: number): this;
  public setMinValues(minValues: number): this;
  public setPlaceholder(placeholder: string): this;
  public spliceOptions(
    index: number,
    deleteCount: number,
    ...options: MessageSelectOptionData[] | MessageSelectOptionData[][]
  ): this;
  public toJSON(): APISelectMenuComponent;
}

export class Modal {
  public constructor(data?: Modal | ModalOptions);
  public components: MessageActionRow<ModalActionRowComponent>[];
  public customId: string | null;
  public title: string | null;
  public readonly isMessage: false;
  public readonly guildId: Snowflake | null;
  public channelId: Snowflake;
  public readonly channel: TextBasedChannel;
  public readonly guild: Guild | null;
  public readonly replied: boolean;
  public reply(): Promise<Message | Modal>;
  public toJSON(): RawModalSubmitInteractionData;
}

export interface PollQuestionMedia {
  text: string;
}

export class Poll extends Base {
  private constructor(client: Client<true>, data: APIPoll, message: Message);
  public readonly message: Message;
  public question: PollQuestionMedia;
  public answers: Collection<number, PollAnswer>;
  public expiresTimestamp: number;
  public get expiresAt(): Date;
  public allowMultiselect: boolean;
  public layoutType: PollLayoutTypes;
  public resultsFinalized: boolean;
  public end(): Promise<Message>;
}

export class PollAnswer extends Base {
  private constructor(client: Client<true>, data: APIPollAnswer & { count?: number }, poll: Poll);
  private _emoji: APIPartialEmoji | null;
  public readonly poll: Poll;
  public id: number;
  public text: string | null;
  public voteCount: number;
  public get emoji(): GuildEmoji | Emoji | null;
  public fetchVoters(options?: BaseFetchPollAnswerVotersOptions): Promise<Collection<Snowflake, User>>;
}

export interface PollData {
  question: PollQuestionMedia;
  answers: readonly PollAnswerData[];
  duration: number;
  allowMultiselect: boolean;
  layoutType?: PollLayoutTypes;
}

export interface PollAnswerData {
  text: string;
  emoji?: EmojiIdentifierResolvable;
}

export interface BaseFetchPollAnswerVotersOptions {
  after?: Snowflake;
  limit?: number;
}

export interface FetchPollAnswerVotersOptions extends BaseFetchPollAnswerVotersOptions {
  messageId: Snowflake;
  answerId: number;
}

export interface MessageCall {
  readonly endedAt: Date | null;
  endedTimestamp: number | null;
  participants: readonly Snowflake[];
}

export class ModalSubmitFieldsResolver {
  constructor(components: PartialModalActionRow[]);
  private readonly _fields: PartialTextInputData[];
  public getField(customId: string): PartialTextInputData;
  public getTextInputValue(customId: string): string;
}

export interface ModalMessageModalSubmitInteraction<Cached extends CacheType = CacheType>
  extends ModalSubmitInteraction<Cached> {
  message: GuildCacheMessage<Cached>;
  channelId: Snowflake;
  update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  update(options: string | MessagePayload | InteractionUpdateOptions): Promise<void>;
  deferUpdate(options: InteractionDeferUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  deferUpdate(options?: InteractionDeferUpdateOptions): Promise<void>;
  inGuild(): this is ModalMessageModalSubmitInteraction<'raw' | 'cached'>;
  inCachedGuild(): this is ModalMessageModalSubmitInteraction<'cached'>;
  inRawGuild(): this is ModalMessageModalSubmitInteraction<'raw'>;
}

export class ModalSubmitInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  protected constructor(client: Client, data: RawModalSubmitInteractionData);
  public customId: string;
  public components: PartialModalActionRow[];
  public deferred: boolean;
  public ephemeral: boolean | null;
  public message: GuildCacheMessage<Cached> | null;
  public fields: ModalSubmitFieldsResolver;
  public replied: false;
  public webhook: InteractionWebhook;
  public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;
  public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;
  public editReply(options: string | MessagePayload | InteractionEditReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options?: InteractionDeferReplyOptions): Promise<void>;
  public deferUpdate(options: InteractionDeferUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferUpdate(options?: InteractionDeferUpdateOptions): Promise<void>;
  public fetchReply(message?: MessageResolvable | '@original'): Promise<GuildCacheMessage<Cached>>;
  public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;
  public inGuild(): this is ModalSubmitInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is ModalSubmitInteraction<'cached'>;
  public inRawGuild(): this is ModalSubmitInteraction<'raw'>;
  public isFromMessage(): this is ModalMessageModalSubmitInteraction<Cached>;
  public update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public update(options: string | MessagePayload | InteractionUpdateOptions): Promise<void>;
}

export class NewsChannel extends BaseGuildTextChannel {
  public threads: GuildTextThreadManager<AllowedThreadTypeForTextChannel>;
  public type: 'GUILD_NEWS';
  public addFollower(channel: TextChannelResolvable, reason?: string): Promise<NewsChannel>;
}

export class OAuth2Guild extends BaseGuild {
  private constructor(client: Client, data: RawOAuth2GuildData);
  public owner: boolean;
  public permissions: Readonly<Permissions>;
}

export class GroupDMChannel extends TextBasedChannelMixin(Channel, [
  'fetchWebhooks',
  'createWebhook',
  'setRateLimitPerUser',
  'setNSFW',
]) {
  private constructor(client: Client, data: RawPartialGroupDMChannelData);
  public name: string | null;
  public icon: string | null;
  public flags: Readonly<ChannelFlags>;
  private _recipients: RawUserData[];
  public type: 'GROUP_DM';
  public ownerId: Snowflake;
  public readonly recipients: Collection<Snowflake, User>;
  public readonly owner: User;
  public iconURL(options?: StaticImageURLOptions): string | null;
  public leave(slient?: boolean): Promise<this>;
  public edit(data: GroupDMChannelEditData): Promise<this>;
  public setIcon(icon: BufferResolvable | Base64Resolvable | null): Promise<this>;
  public setName(name: string): Promise<this>;
  public setOwner(owner: UserResolvable): Promise<this>;
  public addUser(user: UserResolvable): Promise<this>;
  public removeUser(user: UserResolvable): Promise<this>;
  public getInvite(): Promise<Invite>;
  public fetchAllInvite(): Promise<Collection<string, Invite>>;
  public deleteInvite(invite: InviteResolvable): Promise<this>;
  public sync(): void;
  public ring(recipients?: UserResolvable[]): Promise<void>;
  public readonly voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;
  public readonly shard: WebSocketShard;
  public readonly voiceUsers: Collection<Snowflake, User>;
}

export class PermissionOverwrites extends Base {
  private constructor(client: Client, data: RawPermissionOverwriteData, channel: NonThreadGuildBasedChannel);
  public allow: Readonly<Permissions>;
  public readonly channel: NonThreadGuildBasedChannel;
  public deny: Readonly<Permissions>;
  public id: Snowflake;
  public type: OverwriteType;
  public edit(options: PermissionOverwriteOptions, reason?: string): Promise<PermissionOverwrites>;
  public delete(reason?: string): Promise<PermissionOverwrites>;
  public toJSON(): unknown;
  public static resolveOverwriteOptions(
    options: PermissionOverwriteOptions,
    initialPermissions: { allow?: PermissionResolvable; deny?: PermissionResolvable },
  ): ResolvedOverwriteOptions;
  public static resolve(overwrite: OverwriteResolvable, guild: Guild): APIOverwrite;
}

export class Permissions extends BitField<PermissionString, bigint> {
  public any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
  public has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;
  public missing(bits: BitFieldResolvable<PermissionString, bigint>, checkAdmin?: boolean): PermissionString[];
  public serialize(checkAdmin?: boolean): Record<PermissionString, boolean>;
  public toArray(): PermissionString[];

  public static ALL: bigint;
  public static DEFAULT: bigint;
  public static STAGE_MODERATOR: bigint;
  public static FLAGS: PermissionFlags;
  public static resolve(permission?: PermissionResolvable): bigint;
}

export class Presence extends Base {
  protected constructor(client: Client, data?: RawPresenceData);
  public activities: (Activity | CustomStatus | RichPresence | SpotifyRPC)[];
  public clientStatus: ClientPresenceStatusData | null;
  public lastModified: number | null;
  public guild: Guild | null;
  public readonly member: GuildMember | null;
  public status: PresenceStatus;
  public readonly user: User | null;
  public userId: Snowflake;
  public equals(presence: Presence): boolean;
}

export class ReactionCollector extends Collector<Snowflake | string, MessageReaction, [User]> {
  public constructor(message: Message, options?: ReactionCollectorOptions);
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;
  private _handleGuildDeletion(guild: Guild): void;
  private _handleMessageDeletion(message: Message): void;

  public readonly endReason: string | null;
  public message: Message;
  public options: ReactionCollectorOptions;
  public total: number;
  public users: Collection<Snowflake, User>;

  public static key(reaction: MessageReaction): Snowflake | string;

  public collect(reaction: MessageReaction, user: User): Snowflake | string | null;
  public dispose(reaction: MessageReaction, user: User): Snowflake | string | null;
  public empty(): void;

  public on(event: 'collect' | 'dispose' | 'remove', listener: (reaction: MessageReaction, user: User) => void): this;
  public on(event: 'end', listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void): this;
  public on(event: string, listener: (...args: any[]) => void): this;

  public once(event: 'collect' | 'dispose' | 'remove', listener: (reaction: MessageReaction, user: User) => void): this;
  public once(
    event: 'end',
    listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void,
  ): this;
  public once(event: string, listener: (...args: any[]) => void): this;
}

export class ReactionEmoji extends Emoji {
  private constructor(reaction: MessageReaction, emoji: RawReactionEmojiData);
  public reaction: MessageReaction;
  public toJSON(): unknown;
}

export class RichPresenceAssets {
  private constructor(activity: Activity, assets: RawRichPresenceAssets);
  public readonly activity: Activity;
  public largeImage: Snowflake | null;
  public largeText: string | null;
  public smallImage: Snowflake | null;
  public smallText: string | null;
  public largeImageURL(options?: StaticImageURLOptions): string | null;
  public smallImageURL(options?: StaticImageURLOptions): string | null;
  public static parseImage(image: string): string | null;
  public toJSON(): unknown;
  public setLargeImage(image?: string): this;
  public setLargeText(text?: string): this;
  public setSmallImage(image?: string): this;
  public setSmallText(text?: string): this;
}

export interface RoleColors {
  primaryColor: number;
  secondaryColor: number | null;
  tertiaryColor: number | null;
}

export interface RoleColorsResolvable {
  primaryColor: ColorResolvable;
  secondaryColor?: ColorResolvable;
  tertiaryColor?: ColorResolvable;
}

export class Role extends Base {
  private constructor(client: Client, data: RawRoleData, guild: Guild);
  /** @deprecated Use {@link Role.colors} instead. */
  public color: number;
  public colors: RoleColors;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public readonly editable: boolean;
  public flags: Readonly<RoleFlags>;
  public guild: Guild;
  public readonly hexColor: HexColorString;
  public hexAccentColor: HexColorString;
  public hoist: boolean;
  public id: Snowflake;
  public managed: boolean;
  public readonly members: Collection<Snowflake, GuildMember>;
  public mentionable: boolean;
  public name: string;
  public permissions: Readonly<Permissions>;
  public readonly position: number;
  public rawPosition: number;
  public tags: RoleTagData | null;
  public comparePositionTo(role: RoleResolvable): number;
  public icon: string | null;
  public unicodeEmoji: string | null;
  public delete(reason?: string): Promise<Role>;
  public edit(data: RoleData, reason?: string): Promise<Role>;
  public equals(role: Role): boolean;
  public iconURL(options?: StaticImageURLOptions): string | null;
  public permissionsIn(channel: NonThreadGuildBasedChannel | Snowflake, checkAdmin?: boolean): Readonly<Permissions>;
  /** @deprecated Use {@link Role.setColors} instead. */
  public setColor(color: ColorResolvable, reason?: string): Promise<Role>;
  public setColors(colors: RoleColorsResolvable, reason?: string): Promise<Role>;
  public setHoist(hoist?: boolean, reason?: string): Promise<Role>;
  public setMentionable(mentionable?: boolean, reason?: string): Promise<Role>;
  public setName(name: string, reason?: string): Promise<Role>;
  public setPermissions(permissions: PermissionResolvable, reason?: string): Promise<Role>;
  public setIcon(icon: BufferResolvable | Base64Resolvable | EmojiResolvable | null, reason?: string): Promise<Role>;
  public setPosition(position: number, options?: SetRolePositionOptions): Promise<Role>;
  public setUnicodeEmoji(unicodeEmoji: string | null, reason?: string): Promise<Role>;
  public fetchMemberIds(): Promise<Snowflake[]>;
  public toJSON(): unknown;
  public toString(): RoleMention;

  /** @deprecated Use {@link RoleManager.comparePositions} instead. */
  public static comparePositions(role1: Role, role2: Role): number;
}

export class RoleFlags extends BitField<RoleFlagsString> {
  public static FLAGS: Record<RoleFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<RoleFlagsString, number>): number;
}

export type RoleFlagsString = 'IN_PROMPT';

export class Speaking extends BitField<SpeakingString> {
  public static FLAGS: Record<SpeakingString, number>;
  public static resolve(bit?: BitFieldResolvable<SpeakingString, number>): number;
}

export type SpeakingString = 'SPEAKING' | 'SOUNDSHARE' | 'PRIORITY_SPEAKING';

export class BaseSelectMenuInteraction<
  Cached extends CacheType = CacheType,
> extends MessageComponentInteraction<Cached> {
  public constructor(client: Client, data: RawMessageSelectMenuInteractionData);
  public readonly component: CacheTypeReducer<
    Cached,
    MessageSelectMenu,
    APISelectMenuComponent,
    MessageSelectMenu | APISelectMenuComponent,
    MessageSelectMenu | APISelectMenuComponent
  >;
  public componentType: SelectMenuComponentType;
  public values: string[];
  public inGuild(): this is SelectMenuInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is SelectMenuInteraction<'cached'>;
  public inRawGuild(): this is SelectMenuInteraction<'raw'>;
}

export class ChannelSelectInteraction<Cached extends CacheType = CacheType> extends BaseSelectMenuInteraction<Cached> {
  public componentType: 'CHANNEL_SELECT';
  public channels: Collection<
    Snowflake,
    CacheTypeReducer<Cached, Channel, APIChannel, Channel | APIChannel, Channel | APIChannel>
  >;
  public inGuild(): this is ChannelSelectInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is ChannelSelectInteraction<'cached'>;
  public inRawGuild(): this is ChannelSelectInteraction<'raw'>;
}

export class MentionableSelectInteraction<
  Cached extends CacheType = CacheType,
> extends BaseSelectMenuInteraction<Cached> {
  public componentType: 'MENTIONABLE_SELECT';
  public channels?: Collection<
    Snowflake,
    CacheTypeReducer<Cached, Channel, APIChannel, Channel | APIChannel, Channel | APIChannel>
  >;
  public members?: Collection<
    Snowflake,
    CacheTypeReducer<Cached, GuildMember, APIGuildMember, GuildMember | APIGuildMember, GuildMember | APIGuildMember>
  >;
  public roles?: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole, Role | APIRole, Role | APIRole>>;
  public users?: Collection<Snowflake, User>;
  public inGuild(): this is MentionableSelectInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is MentionableSelectInteraction<'cached'>;
  public inRawGuild(): this is MentionableSelectInteraction<'raw'>;
}

export class RoleSelectInteraction<Cached extends CacheType = CacheType> extends BaseSelectMenuInteraction<Cached> {
  public componentType: 'ROLE_SELECT';
  public roles: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole, Role | APIRole, Role | APIRole>>;
  public inGuild(): this is RoleSelectInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is RoleSelectInteraction<'cached'>;
  public inRawGuild(): this is RoleSelectInteraction<'raw'>;
}

export class StringSelectInteraction<Cached extends CacheType = CacheType> extends BaseSelectMenuInteraction<Cached> {
  public componentType: 'STRING_SELECT';
  public roles: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole, Role | APIRole, Role | APIRole>>;
  public inGuild(): this is StringSelectInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is StringSelectInteraction<'cached'>;
  public inRawGuild(): this is StringSelectInteraction<'raw'>;
}

export class UserSelectInteraction<Cached extends CacheType = CacheType> extends BaseSelectMenuInteraction<Cached> {
  public componentType: 'USER_SELECT';
  public members?: Collection<
    Snowflake,
    CacheTypeReducer<Cached, GuildMember, APIGuildMember, GuildMember | APIGuildMember, GuildMember | APIGuildMember>
  >;
  public users: Collection<Snowflake, User>;
  public inGuild(): this is UserSelectInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is UserSelectInteraction<'cached'>;
  public inRawGuild(): this is UserSelectInteraction<'raw'>;
}

export type SelectMenuInteraction<Cached extends CacheType = CacheType> =
  | StringSelectInteraction<Cached>
  | ChannelSelectInteraction<Cached>
  | MentionableSelectInteraction<Cached>
  | RoleSelectInteraction<Cached>
  | UserSelectInteraction<Cached>;

export interface ShardEventTypes {
  spawn: [process: ChildProcess | Worker];
  death: [process: ChildProcess | Worker];
  disconnect: [];
  ready: [];
  reconnecting: [];
  error: [error: Error];
  message: [message: any];
}

/** @deprecated This will be removed in the next major version */
export class Shard extends EventEmitter {
  private constructor(manager: ShardingManager, id: number);
  private _evals: Map<string, Promise<unknown>>;
  private _exitListener: (...args: any[]) => void;
  private _fetches: Map<string, Promise<unknown>>;
  private _handleExit(respawn?: boolean, timeout?: number): void;
  private _handleMessage(message: unknown): void;
  private incrementMaxListeners(emitter: EventEmitter | ChildProcess): void;
  private decrementMaxListeners(emitter: EventEmitter | ChildProcess): void;

  public args: string[];
  public execArgv: string[];
  public env: unknown;
  public id: number;
  public manager: ShardingManager;
  public process: ChildProcess | null;
  public ready: boolean;
  public worker: Worker | null;
  public eval(script: string): Promise<unknown>;
  public eval<T>(fn: (client: Client) => T): Promise<T>;
  public eval<T, P>(fn: (client: Client, context: Serialized<P>) => T, context: P): Promise<T>;
  public fetchClientValue(prop: string): Promise<unknown>;
  public kill(): void;
  public respawn(options?: { delay?: number; timeout?: number }): Promise<ChildProcess>;
  public send(message: unknown): Promise<Shard>;
  public spawn(timeout?: number): Promise<ChildProcess>;

  public on<K extends keyof ShardEventTypes>(
    event: K,
    listener: (...args: ShardEventTypes[K]) => Awaitable<void>,
  ): this;

  public once<K extends keyof ShardEventTypes>(
    event: K,
    listener: (...args: ShardEventTypes[K]) => Awaitable<void>,
  ): this;
}

/** @deprecated This will be removed in the next major version */
export class ShardClientUtil {
  private constructor(client: Client, mode: ShardingManagerMode);
  private _handleMessage(message: unknown): void;
  private _respond(type: string, message: unknown): void;
  private incrementMaxListeners(emitter: EventEmitter | ChildProcess): void;
  private decrementMaxListeners(emitter: EventEmitter | ChildProcess): void;

  public client: Client;
  public readonly count: number;
  public readonly ids: number[];
  public mode: ShardingManagerMode;
  public parentPort: MessagePort | null;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>): Promise<Serialized<T>[]>;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>, options: { shard: number }): Promise<Serialized<T>>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P },
  ): Promise<Serialized<T>[]>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P; shard: number },
  ): Promise<Serialized<T>>;
  public fetchClientValues(prop: string): Promise<unknown[]>;
  public fetchClientValues(prop: string, shard: number): Promise<unknown>;
  public respawnAll(options?: MultipleShardRespawnOptions): Promise<void>;
  public send(message: unknown): Promise<void>;

  public static singleton(client: Client, mode: ShardingManagerMode): ShardClientUtil;
  public static shardIdForGuildId(guildId: Snowflake, shardCount: number): number;
}

/** @deprecated This will be removed in the next major version */
export class ShardingManager extends EventEmitter {
  public constructor(file: string, options?: ShardingManagerOptions);
  private _performOnShards(method: string, args: unknown[]): Promise<unknown[]>;
  private _performOnShards(method: string, args: unknown[], shard: number): Promise<unknown>;

  public file: string;
  public respawn: boolean;
  public shardArgs: string[];
  public shards: Collection<number, Shard>;
  public token: string | null;
  public totalShards: number | 'auto';
  public shardList: number[] | 'auto';
  public broadcast(message: unknown): Promise<Shard[]>;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>): Promise<Serialized<T>[]>;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>, options: { shard: number }): Promise<Serialized<T>>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P },
  ): Promise<Serialized<T>[]>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P; shard: number },
  ): Promise<Serialized<T>>;
  public createShard(id: number): Shard;
  public fetchClientValues(prop: string): Promise<unknown[]>;
  public fetchClientValues(prop: string, shard: number): Promise<unknown>;
  public respawnAll(options?: MultipleShardRespawnOptions): Promise<Collection<number, Shard>>;
  public spawn(options?: MultipleShardSpawnOptions): Promise<Collection<number, Shard>>;

  public on(event: 'shardCreate', listener: (shard: Shard) => Awaitable<void>): this;

  public once(event: 'shardCreate', listener: (shard: Shard) => Awaitable<void>): this;
}

export interface FetchRecommendedShardsOptions {
  guildsPerShard?: number;
  multipleOf?: number;
}

export class SnowflakeUtil extends null {
  private constructor();
  public static deconstruct(snowflake: Snowflake): DeconstructedSnowflake;
  public static generate(timestamp?: number | Date): Snowflake;
  public static timestampFrom(snowflake: Snowflake): number;
  public static readonly EPOCH: number;
}

export class StageChannel extends BaseGuildVoiceChannel {
  public readonly stageInstance: StageInstance | null;
  public topic: string | null;
  public type: 'GUILD_STAGE_VOICE';
  public createStageInstance(options: StageInstanceCreateOptions): Promise<StageInstance>;
  public setTopic(topic: string): Promise<StageChannel>;
}

export class DirectoryChannel extends Channel {
  public flags: Readonly<ChannelFlags>;
}

export class StageInstance extends Base {
  private constructor(client: Client, data: RawStageInstanceData, channel: StageChannel);
  public id: Snowflake;
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public guildId: Snowflake;
  public channelId: Snowflake;
  public topic: string;
  public privacyLevel: PrivacyLevel;
  public discoverableDisabled: boolean | null;
  public guildScheduledEventId?: Snowflake;
  public readonly channel: StageChannel | null;
  public readonly guild: Guild | null;
  public get guildScheduledEvent(): GuildScheduledEvent | null;
  public edit(options: StageInstanceEditOptions): Promise<StageInstance>;
  public delete(): Promise<StageInstance>;
  public setTopic(topic: string): Promise<StageInstance>;
  public readonly createdTimestamp: number;
  public readonly createdAt: Date;
}

export class Sticker extends Base {
  private constructor(client: Client, data: RawStickerData);
  /** @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091 */
  public deleted: boolean;
  public readonly createdTimestamp: number;
  public readonly createdAt: Date;
  public available: boolean | null;
  public description: string | null;
  public format: StickerFormatType;
  public readonly guild: Guild | null;
  public guildId: Snowflake | null;
  public id: Snowflake;
  public name: string;
  public packId: Snowflake | null;
  public readonly partial: boolean;
  public sortValue: number | null;
  public tags: string[] | null;
  public type: StickerType | null;
  public user: User | null;
  public readonly url: string;
  public fetch(): Promise<Sticker>;
  public fetchPack(): Promise<StickerPack | null>;
  public fetchUser(): Promise<User | null>;
  public edit(data?: GuildStickerEditData, reason?: string): Promise<Sticker>;
  public delete(reason?: string): Promise<Sticker>;
  public equals(other: Sticker | unknown): boolean;
}

export class StickerPack extends Base {
  private constructor(client: Client, data: RawStickerPackData);
  public readonly createdTimestamp: number;
  public readonly createdAt: Date;
  public bannerId: Snowflake | null;
  public readonly coverSticker: Sticker | null;
  public coverStickerId: Snowflake | null;
  public description: string;
  public id: Snowflake;
  public name: string;
  public skuId: Snowflake;
  public stickers: Collection<Snowflake, Sticker>;
  public bannerURL(options?: StaticImageURLOptions): string | null;
}

/** @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/6309018858647) for more information */
export class StoreChannel extends GuildChannel {
  private constructor(guild: Guild, data?: RawGuildChannelData, client?: Client);
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;
  /** @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/6309018858647) for more information */
  public clone(options?: GuildChannelCloneOptions): Promise<this>;
  public nsfw: boolean;
  public type: 'GUILD_STORE';
}

export class Sweepers {
  public constructor(client: Client, options: SweeperOptions);
  public readonly client: Client;
  public intervals: Record<SweeperKey, any | null>;
  public options: SweeperOptions;

  public sweepApplicationCommands(
    filter: CollectionSweepFilter<
      SweeperDefinitions['applicationCommands'][0],
      SweeperDefinitions['applicationCommands'][1]
    >,
  ): number;
  public sweepBans(filter: CollectionSweepFilter<SweeperDefinitions['bans'][0], SweeperDefinitions['bans'][1]>): number;
  public sweepEmojis(
    filter: CollectionSweepFilter<SweeperDefinitions['emojis'][0], SweeperDefinitions['emojis'][1]>,
  ): number;
  public sweepInvites(
    filter: CollectionSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>,
  ): number;
  public sweepGuildMembers(
    filter: CollectionSweepFilter<SweeperDefinitions['guildMembers'][0], SweeperDefinitions['guildMembers'][1]>,
  ): number;
  public sweepMessages(
    filter: CollectionSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>,
  ): number;
  public sweepPresences(
    filter: CollectionSweepFilter<SweeperDefinitions['presences'][0], SweeperDefinitions['presences'][1]>,
  ): number;
  public sweepReactions(
    filter: CollectionSweepFilter<SweeperDefinitions['reactions'][0], SweeperDefinitions['reactions'][1]>,
  ): number;
  public sweepStageInstances(
    filter: CollectionSweepFilter<SweeperDefinitions['stageInstances'][0], SweeperDefinitions['stageInstances'][1]>,
  ): number;
  public sweepStickers(
    filter: CollectionSweepFilter<SweeperDefinitions['stickers'][0], SweeperDefinitions['stickers'][1]>,
  ): number;
  public sweepThreadMembers(
    filter: CollectionSweepFilter<SweeperDefinitions['threadMembers'][0], SweeperDefinitions['threadMembers'][1]>,
  ): number;
  public sweepThreads(
    filter: CollectionSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>,
  ): number;
  public sweepUsers(
    filter: CollectionSweepFilter<SweeperDefinitions['users'][0], SweeperDefinitions['users'][1]>,
  ): number;
  public sweepVoiceStates(
    filter: CollectionSweepFilter<SweeperDefinitions['voiceStates'][0], SweeperDefinitions['voiceStates'][1]>,
  ): number;

  public static archivedThreadSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>;
  public static expiredInviteSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>;
  public static filterByLifetime<K, V>(options?: LifetimeFilterOptions<K, V>): GlobalSweepFilter<K, V>;
  public static outdatedMessageSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>;
}

export class SystemChannelFlags extends BitField<SystemChannelFlagsString> {
  public static FLAGS: Record<SystemChannelFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<SystemChannelFlagsString, number>): number;
}

export class Team extends Base {
  private constructor(client: Client, data: RawTeamData);
  public id: Snowflake;
  public name: string;
  public icon: string | null;
  public ownerId: Snowflake | null;
  public members: Collection<Snowflake, TeamMember>;

  public readonly owner: TeamMember | null;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;

  public iconURL(options?: StaticImageURLOptions): string | null;
  public toJSON(): unknown;
  public toString(): string;
}

export class TeamMember extends Base {
  private constructor(team: Team, data: RawTeamMemberData);
  public team: Team;
  public readonly id: Snowflake;
  /** @deprecated Use {@link role} instead. */
  public permissions: string[];
  public membershipState: MembershipState;
  public role: TeamMemberRole;
  public user: User;

  public toString(): UserMention;
}

export class TextChannel extends BaseGuildTextChannel {
  public rateLimitPerUser: number;
  public threads: GuildTextThreadManager<AllowedThreadTypeForTextChannel>;
  public type: 'GUILD_TEXT';
}

export interface GuildForumTagEmoji {
  id: Snowflake | null;
  name: string | null;
}

export interface GuildForumTag {
  id: Snowflake;
  name: string;
  moderated: boolean;
  emoji: GuildForumTagEmoji | null;
}

export type GuildForumTagData = Partial<GuildForumTag> & { name: string };

export interface DefaultReactionEmoji {
  id: Snowflake | null;
  name: string | null;
}

export abstract class ThreadOnlyChannel extends TextBasedChannelMixin(GuildChannel, [
  'send',
  'lastMessage',
  'lastPinAt',
  'sendTyping',
  'createMessageCollector',
  'awaitMessages',
  'messages',
]) {
  public type: 'GUILD_FORUM' | 'GUILD_MEDIA';
  public threads: GuildForumThreadManager;
  public availableTags: GuildForumTag[];
  public defaultReactionEmoji: DefaultReactionEmoji | null;
  public defaultThreadRateLimitPerUser: number | null;
  public rateLimitPerUser: number | null;
  public defaultAutoArchiveDuration: ThreadAutoArchiveDuration | null;
  public nsfw: boolean;
  public topic: string | null;
  public defaultSortOrder: SortOrderTypes | null;
  public setAvailableTags(tags: GuildForumTagData[], reason?: string): Promise<this>;
  public setDefaultReactionEmoji(emojiId: DefaultReactionEmoji | null, reason?: string): Promise<this>;
  public setDefaultThreadRateLimitPerUser(rateLimit: number, reason?: string): Promise<this>;
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;
  public setDefaultAutoArchiveDuration(
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration,
    reason?: string,
  ): Promise<this>;
  public setTopic(topic: string | null, reason?: string): Promise<this>;
  public setDefaultSortOrder(defaultSortOrder: SortOrderTypes | null, reason?: string): Promise<this>;
}

export class ForumChannel extends ThreadOnlyChannel {
  public type: 'GUILD_FORUM';
  public defaultForumLayout: ForumLayoutTypes;
  public setDefaultForumLayout(defaultForumLayout: ForumLayoutTypes, reason?: string): Promise<this>;
}

export class MediaChannel extends ThreadOnlyChannel {
  public type: 'GUILD_MEDIA';
}

export class TextInputComponent extends BaseMessageComponent {
  public constructor(data?: TextInputComponent | TextInputComponentOptions);
  public customId: string | null;
  public label: string | null;
  public required: boolean;
  public maxLength: number | null;
  public minLength: number | null;
  public placeholder: string | null;
  public style: TextInputStyle;
  public value: string | null;
  public setValue(value: string): this;
  public toJSON(): RawTextInputComponentData;
  public static resolveStyle(style: TextInputStyleResolvable): TextInputStyle;
}

export class ThreadChannel extends TextBasedChannelMixin(Channel, ['fetchWebhooks', 'createWebhook', 'setNSFW']) {
  private constructor(guild: Guild, data?: RawThreadChannelData, client?: Client);
  public archived: boolean | null;
  public readonly archivedAt: Date | null;
  public archiveTimestamp: number | null;
  public readonly createdAt: Date | null;
  private _createdTimestamp: number | null;
  public readonly createdTimestamp: number | null;
  public autoArchiveDuration: ThreadAutoArchiveDuration | null;
  public readonly editable: boolean;
  public guild: Guild;
  public guildId: Snowflake;
  public readonly guildMembers: Collection<Snowflake, GuildMember>;
  public invitable: boolean | null;
  public readonly joinable: boolean;
  public readonly joined: boolean;
  public locked: boolean | null;
  public readonly manageable: boolean;
  public readonly viewable: boolean;
  public readonly sendable: boolean;
  public memberCount: number | null;
  public messageCount: number | null;
  public members: ThreadMemberManager;
  public name: string;
  public ownerId: Snowflake;
  public readonly parent: TextChannel | NewsChannel | ForumChannel | MediaChannel | null;
  public parentId: Snowflake | null;
  public rateLimitPerUser: number | null;
  public type: ThreadChannelTypes;
  public flags: Readonly<ChannelFlags>;
  public appliedTags: Snowflake[];
  public totalMessageSent: number | null;
  public readonly unarchivable: boolean;
  public isPrivate(): this is this & {
    readonly createdTimestamp: number;
    readonly createdAt: Date;
    type: 'GUILD_PRIVATE_THREAD';
  };
  public delete(reason?: string): Promise<this>;
  public edit(data: ThreadEditData, reason?: string): Promise<ThreadChannel>;
  public join(): Promise<ThreadChannel>;
  public leave(): Promise<ThreadChannel>;
  public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<Permissions>;
  public permissionsFor(
    memberOrRole: GuildMemberResolvable | RoleResolvable,
    checkAdmin?: boolean,
  ): Readonly<Permissions> | null;
  public fetchOwner(options?: BaseFetchOptions): Promise<ThreadMember | null>;
  public fetchStarterMessage(options?: BaseFetchOptions): Promise<Message | null>;
  public setArchived(archived?: boolean, reason?: string): Promise<ThreadChannel>;
  public setAutoArchiveDuration(
    autoArchiveDuration: ThreadAutoArchiveDuration | 'MAX',
    reason?: string,
  ): Promise<ThreadChannel>;
  public setInvitable(invitable?: boolean, reason?: string): Promise<ThreadChannel>;
  public setLocked(locked?: boolean, reason?: string): Promise<ThreadChannel>;
  public setName(name: string, reason?: string): Promise<ThreadChannel>;
  public setAppliedTags(appliedTags: Snowflake[], reason?: string): Promise<ThreadChannel>;
  public pin(reason?: string): Promise<ThreadChannel>;
  public unpin(reason?: string): Promise<ThreadChannel>;
}

export class ThreadMember<HasMemberData extends boolean = boolean> extends Base {
  private constructor(thread: ThreadChannel, data?: RawThreadMemberData, extra?: unknown);
  public flags: ThreadMemberFlags;
  public readonly guildMember: HasMemberData extends true ? GuildMember : GuildMember | null;
  public id: Snowflake;
  public readonly joinedAt: Date | null;
  public joinedTimestamp: number | null;
  public readonly manageable: boolean;
  private member: If<HasMemberData, GuildMember>;
  public thread: ThreadChannel;
  public readonly user: User | null;
  public remove(reason?: string): Promise<ThreadMember>;
}

export class ThreadMemberFlags extends BitField<ThreadMemberFlagsString> {
  public static FLAGS: Record<ThreadMemberFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<ThreadMemberFlagsString, number>): number;
}

export class TOTP {
  private static hex2dec(hex: string): number;
  private static dec2hex(dec: number): string;
  private static base32ToBuffer(str: string): ArrayBuffer;
  private static asciiToBuffer(str: string): ArrayBuffer;
  private static hex2buf(hex: string): ArrayBuffer;
  private static buf2hex(buf: ArrayBuffer): string;
  private static readonly base32: { [key: number]: number };
  private static readonly crypto: SubtleCrypto;
  public static generate(key: string, options?: generateOptions): Promise<{ otp: string; expires: number }>;
}

export type TOTPAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';
export type TOTPEncoding = 'hex' | 'ascii';

export interface generateOptions {
  digits: number;
  algorithm: TOTPAlgorithm;
  encoding: TOTPEncoding;
  period: number;
  timestamp: number;
}

export class Typing extends Base {
  private constructor(channel: TextBasedChannel, user: PartialUser, data?: RawTypingData);
  public channel: TextBasedChannel;
  public user: PartialUser;
  public startedTimestamp: number;
  public readonly startedAt: Date;
  public readonly guild: Guild | null;
  public readonly member: GuildMember | null;
  public inGuild(): this is this & {
    channel: TextChannel | NewsChannel | ThreadChannel;
    readonly guild: Guild;
  };
}

export interface UserPrimaryGuild {
  badge: string | null;
  identityEnabled: boolean | null;
  identityGuildId: Snowflake | null;
  tag: string | null;
}

export interface AvatarDecorationData {
  asset: string;
  skuId: Snowflake;
}

export interface NameplateData {
  asset: string;
  label: string;
  palette: NameplatePalette;
  skuId: Snowflake;
}

export interface Collectibles {
  nameplate: NameplateData | null;
}

export class User extends PartialTextBasedChannel(Base) {
  protected constructor(client: Client, data: RawUserData);
  private _equals(user: APIUser): boolean;

  public accentColor: number | null | undefined;
  public avatar: string | null;
  /** @deprecated Use {@link User.avatarDecorationData} instead */
  public readonly avatarDecoration: string | null;
  public avatarDecorationData: AvatarDecorationData | null;
  public banner: string | null | undefined;
  public bannerColor: string | null | undefined;
  public bot: boolean;
  public readonly createdAt: Date;
  public readonly createdTimestamp: number;
  public collectibles: Collectibles | null;
  public discriminator: string;
  public readonly displayName: string;
  public readonly defaultAvatarURL: string;
  public readonly dmChannel: DMChannel | null;
  public flags: Readonly<UserFlags> | null;
  public globalName: string | null;
  public readonly hexAccentColor: HexColorString | null | undefined;
  public id: Snowflake;
  public readonly partial: false;
  public system: boolean;
  public readonly tag: string;
  public username: string;
  public readonly note: string | undefined;
  public readonly voice?: VoiceState;
  public readonly relationship: RelationshipTypes;
  public readonly friendNickname: string | null | undefined;
  public primaryGuild: UserPrimaryGuild | null;
  /** @deprecated Use {@link User.primaryGuild} instead */
  public clan: UserPrimaryGuild | null;
  public avatarURL(options?: ImageURLOptions): string | null;
  public avatarDecorationURL(): string | null;
  public bannerURL(options?: ImageURLOptions): string | null;
  /** @deprecated Use {@link User.guildTagBadgeURL} instead */
  public clanBadgeURL(): string | null;
  public guildTagBadgeURL(options?: ImageURLOptions): string | null;
  public createDM(force?: boolean): Promise<DMChannel>;
  public deleteDM(): Promise<DMChannel>;
  public displayAvatarURL(options?: ImageURLOptions): string;
  public equals(user: User): boolean;
  public fetch(force?: boolean): Promise<User>;
  public setNote(note: string | null | undefined): Promise<this>;
  public toString(): UserMention;
  public getProfile(guildId?: Snowflake): Promise<any>;
  public sendFriendRequest(): Promise<boolean>;
  public deleteRelationship(): Promise<boolean>;
}

export class UserContextMenuInteraction<Cached extends CacheType = CacheType> extends ContextMenuInteraction<Cached> {
  public readonly targetUser: User;
  public readonly targetMember: CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember>;
  public inGuild(): this is UserContextMenuInteraction<'raw' | 'cached'>;
  public inCachedGuild(): this is UserContextMenuInteraction<'cached'>;
  public inRawGuild(): this is UserContextMenuInteraction<'raw'>;
}

export class UserFlags extends BitField<UserFlagsString> {
  public static FLAGS: Record<UserFlagsString, number>;
  public static resolve(bit?: BitFieldResolvable<UserFlagsString, number>): number;
}

export class Util extends null {
  private constructor();
  /** @deprecated When not using with `makeCache` use `Sweepers.archivedThreadSweepFilter` instead */
  public static archivedThreadSweepFilter<K, V>(lifetime?: number): SweepFilter<K, V>;
  public static basename(path: string, ext?: string): string;
  public static cleanContent(str: string, channel: TextBasedChannel): string;
  /** @deprecated Use {@link MessageOptions.allowedMentions} to control mentions in a message instead. */
  public static removeMentions(str: string): string;
  private static _removeMentions(str: string): string;
  public static cloneObject(obj: unknown): unknown;
  public static discordSort<K, V extends { rawPosition: number; id: Snowflake }>(
    collection: Collection<K, V>,
  ): Collection<K, V>;
  public static escapeMarkdown(text: string, options?: EscapeMarkdownOptions): string;
  public static escapeCodeBlock(text: string): string;
  public static escapeInlineCode(text: string): string;
  public static escapeBold(text: string): string;
  public static escapeItalic(text: string): string;
  public static escapeUnderline(text: string): string;
  public static escapeStrikethrough(text: string): string;
  public static escapeSpoiler(text: string): string;
  public static escapeEscape(text: string): string;
  public static escapeHeading(text: string): string;
  public static escapeBulletedList(text: string): string;
  public static escapeNumberedList(text: string): string;
  public static escapeMaskedLink(text: string): string;
  public static cleanCodeBlockContent(text: string): string;
  public static fetchRecommendedShards(token: string, options?: FetchRecommendedShardsOptions): Promise<number>;
  public static flatten(obj: unknown, ...props: Record<string, boolean | string>[]): unknown;
  public static makeError(obj: MakeErrorOptions): Error;
  public static makePlainError(err: Error): MakeErrorOptions;
  public static mergeDefault(def: unknown, given: unknown): unknown;
  public static moveElementInArray(array: unknown[], element: unknown, newIndex: number, offset?: boolean): number;
  public static parseEmoji(text: string): { animated: boolean; name: string; id: Snowflake | null } | null;
  public static resolveColor(color: ColorResolvable): number;
  public static resolvePartialEmoji(emoji: EmojiIdentifierResolvable): Partial<APIPartialEmoji> | null;
  public static verifyString(data: string, error?: typeof Error, errorMessage?: string, allowEmpty?: boolean): string;
  public static setPosition<T extends AnyChannel | Role>(
    item: T,
    position: number,
    relative: boolean,
    sorted: Collection<Snowflake, T>,
    route: unknown,
    reason?: string,
  ): Promise<{ id: Snowflake; position: number }[]>;
  /** @deprecated This will be removed in the next major version. */
  public static splitMessage(text: string, options?: SplitOptions): string[];
  /** @deprecated This will be removed in the next major version. */
  public static resolveAutoArchiveMaxLimit(guild: Guild): Exclude<ThreadAutoArchiveDuration, 60>;
  public static calculateUserDefaultAvatarIndex(userId: Snowflake): number;
}

export class Formatters extends null {
  public static blockQuote: typeof blockQuote;
  public static bold: typeof bold;
  public static channelMention: typeof channelMention;
  public static chatInputApplicationCommandMention<
    N extends string,
    G extends string,
    S extends string,
    I extends Snowflake,
  >(commandName: N, subcommandGroupName: G, subcommandName: S, commandId: I): `</${N} ${G} ${S}:${I}>`;
  public static chatInputApplicationCommandMention<N extends string, S extends string, I extends Snowflake>(
    commandName: N,
    subcommandName: S,
    commandId: I,
  ): `</${N} ${S}:${I}>`;
  public static chatInputApplicationCommandMention<N extends string, I extends Snowflake>(
    commandName: N,
    commandId: I,
  ): `</${N}:${I}>`;
  public static codeBlock: typeof codeBlock;
  public static formatEmoji: typeof formatEmoji;
  public static hideLinkEmbed: typeof hideLinkEmbed;
  public static hyperlink: typeof hyperlink;
  public static inlineCode: typeof inlineCode;
  public static italic: typeof italic;
  public static quote: typeof quote;
  public static roleMention: typeof roleMention;
  public static spoiler: typeof spoiler;
  public static strikethrough: typeof strikethrough;
  public static time: typeof time;
  public static TimestampStyles: typeof TimestampStyles;
  public static TimestampStylesString: TimestampStylesString;
  public static underscore: typeof underscore;
  public static userMention: typeof userMention;
}

export class VoiceChannel extends BaseGuildVoiceChannel {
  /** @deprecated Use manageable instead */
  public readonly editable: boolean;
  public readonly speakable: boolean;
  public type: 'GUILD_VOICE';
}

export class VoiceChannelEffect {
  private constructor(data: GatewayVoiceChannelEffectSendDispatchData, guild: Guild);
  public guild: Guild;
  public channelId: Snowflake;
  public userId: Snowflake;
  public emoji: Emoji | null;
  public animationType: VoiceChannelEffectSendAnimationType | null;
  public animationId: number | null;
  public soundId: Snowflake | number | null;
  public soundVolume: number | null;
  public get channel(): VoiceChannel | null;
}

export class VoiceRegion {
  private constructor(data: RawVoiceRegionData);
  public custom: boolean;
  public deprecated: boolean;
  public id: string;
  public name: string;
  public optimal: boolean;
  /** @deprecated This property is no longer being sent by the API. */
  public vip: boolean;
  public toJSON(): unknown;
}

export class VoiceState extends Base {
  private constructor(guild: Guild, data: RawVoiceStateData);
  public readonly channel: VoiceBasedChannel | DMChannel | GroupDMChannel | null;
  public channelId: Snowflake | null;
  public readonly deaf: boolean | null;
  public guild: Guild;
  public id: Snowflake;
  public readonly member: GuildMember | null;
  public readonly user: User | null;
  public readonly mute: boolean | null;
  public selfDeaf: boolean | null;
  public selfMute: boolean | null;
  public serverDeaf: boolean | null;
  public serverMute: boolean | null;
  public sessionId: string | null;
  public streaming: boolean;
  public selfVideo: boolean | null;
  public suppress: boolean;
  public requestToSpeakTimestamp: number | null;

  public setDeaf(deaf?: boolean, reason?: string): Promise<GuildMember>;
  public setMute(mute?: boolean, reason?: string): Promise<GuildMember>;
  public disconnect(reason?: string): Promise<GuildMember>;
  public setChannel(channel: GuildVoiceChannelResolvable | null, reason?: string): Promise<GuildMember>;
  public setRequestToSpeak(request?: boolean): Promise<void>;
  public setSuppressed(suppressed?: boolean): Promise<void>;
  public setStatus(status?: string): Promise<void>;
  public getPreview(): Promise<string>;
  public postPreview(base64Image: string): Promise<void>;
  public fetch(force?: boolean): Promise<VoiceState>;
}

export class Webhook extends WebhookMixin() {
  private constructor(client: Client, data?: RawWebhookData);
  public avatar: string;
  public avatarURL(options?: StaticImageURLOptions): string | null;
  public readonly channel: TextChannel | VoiceChannel | NewsChannel | ForumChannel | MediaChannel | null;
  public channelId: Snowflake;
  public client: Client;
  public guildId: Snowflake;
  public name: string;
  public owner: User | APIUser | null;
  public sourceGuild: Guild | APIPartialGuild | null;
  public sourceChannel: NewsChannel | APIPartialChannel | null;
  public token: string | null;
  public type: WebhookType;
  public isIncoming(): this is this & { token: string };
  public isChannelFollower(): this is this & {
    sourceGuild: Guild | APIPartialGuild;
    sourceChannel: NewsChannel | APIPartialChannel;
  };
}

export class WebhookClient extends WebhookMixin(BaseClient) {
  public constructor(data: WebhookClientData, options?: WebhookClientOptions);
  public client: this;
  public options: WebhookClientOptions;
  public token: string;
  public editMessage(
    message: MessageResolvable,
    options: string | MessagePayload | WebhookEditMessageOptions,
  ): Promise<APIMessage>;
  public fetchMessage(message: Snowflake, options?: WebhookFetchMessageOptions): Promise<APIMessage>;
  /* tslint:disable:unified-signatures */
  /** @deprecated */
  public fetchMessage(message: Snowflake, cache?: boolean): Promise<APIMessage>;
  /* tslint:enable:unified-signatures */
  public send(options: string | MessagePayload | WebhookMessageOptions): Promise<APIMessage>;
}

export class WebSocketManager extends EventEmitter {
  private constructor(client: Client);
  private totalShards: number | string;
  private shardQueue: Set<WebSocketShard>;
  private packetQueue: unknown[];
  private destroyed: boolean;
  private reconnecting: boolean;

  public readonly client: Client;
  public gateway: string | null;
  public shards: Collection<number, WebSocketShard>;
  public status: Status;
  public readonly ping: number;

  public on(event: WSEventType, listener: (data: any, shardId: number) => void): this;
  public once(event: WSEventType, listener: (data: any, shardId: number) => void): this;

  private debug(message: string, shard?: WebSocketShard): void;
  private connect(): Promise<void>;
  private createShards(): Promise<void>;
  private reconnect(): Promise<void>;
  public broadcast(packet: unknown): void;
  private destroy(): void;
  private handlePacket(packet?: unknown, shard?: WebSocketShard): boolean;
  private checkShardsReady(): void;
  private triggerClientReady(): void;
}

export interface WebSocketShardEvents {
  ready: [];
  resumed: [];
  invalidSession: [];
  destroyed: [];
  close: [event: CloseEvent];
  allReady: [unavailableGuilds?: Set<Snowflake>];
}

export class WebSocketShard extends EventEmitter {
  private constructor(manager: WebSocketManager, id: number);
  private sequence: number;
  private closeSequence: number;
  private resumeURL: string | null;
  private sessionId: string | null;
  private lastPingTimestamp: number;
  private lastHeartbeatAcked: boolean;
  private ratelimit: { queue: unknown[]; total: number; remaining: number; time: 60e3; timer: any | null };
  private connection: WebSocket | null;
  private helloTimeout: any | null;
  private eventsAttached: boolean;
  private expectedGuilds: Set<Snowflake> | null;
  private readyTimeout: any | null;
  private closeEmitted: boolean;
  private wsCloseTimeout: any | null;

  public manager: WebSocketManager;
  public id: number;
  public status: Status;
  public ping: number;

  private debug(message: string): void;
  private connect(): Promise<void>;
  private onOpen(): void;
  private onMessage(event: MessageEvent): void;
  private onError(error: ErrorEvent | unknown): void;
  private onClose(event: CloseEvent): void;
  private onPacket(packet: unknown): void;
  private checkReady(): void;
  private setHelloTimeout(time?: number): void;
  private setWsCloseTimeout(time?: number): void;
  private setHeartbeatTimer(time: number): void;
  private sendHeartbeat(): void;
  private ackHeartbeat(): void;
  private identify(): void;
  private identifyNew(): void;
  private identifyResume(): void;
  private _send(data: unknown): void;
  private processQueue(): void;
  private destroy(destroyOptions?: { closeCode?: number; reset?: boolean; emit?: boolean; log?: boolean }): void;
  private emitClose(event?: CloseEvent): void;
  private _cleanupConnection(): void;
  private _emitDestroyed(): void;

  public send(data: unknown, important?: boolean): void;

  public on<K extends keyof WebSocketShardEvents>(
    event: K,
    listener: (...args: WebSocketShardEvents[K]) => Awaitable<void>,
  ): this;

  public once<K extends keyof WebSocketShardEvents>(
    event: K,
    listener: (...args: WebSocketShardEvents[K]) => Awaitable<void>,
  ): this;
}

export class Widget extends Base {
  private constructor(client: Client, data: RawWidgetData);
  private _patch(data: RawWidgetData): void;
  public fetch(): Promise<Widget>;
  public id: Snowflake;
  public name: string;
  public instantInvite?: string;
  public channels: Collection<Snowflake, WidgetChannel>;
  public members: Collection<string, WidgetMember>;
  public presenceCount: number;
}

export class WidgetMember extends Base {
  private constructor(client: Client, data: RawWidgetMemberData);
  public id: string;
  public username: string;
  public discriminator: string;
  public avatar: string | null;
  public status: PresenceStatus;
  public deaf: boolean | null;
  public mute: boolean | null;
  public selfDeaf: boolean | null;
  public selfMute: boolean | null;
  public suppress: boolean | null;
  public channelId: Snowflake | null;
  public avatarURL: string;
  public activity: WidgetActivity | null;
}

export class WelcomeChannel extends Base {
  private constructor(guild: Guild, data: RawWelcomeChannelData);
  private _emoji: Omit<APIEmoji, 'animated'>;
  public channelId: Snowflake;
  public guild: Guild | InviteGuild;
  public description: string;
  public readonly channel: TextChannel | NewsChannel | StoreChannel | ForumChannel | MediaChannel | null;
  public readonly emoji: GuildEmoji | Emoji;
}

export class WelcomeScreen extends Base {
  private constructor(guild: Guild, data: RawWelcomeScreenData);
  public readonly enabled: boolean;
  public guild: Guild | InviteGuild;
  public description: string | null;
  public welcomeChannels: Collection<Snowflake, WelcomeChannel>;
}

//#endregion

//#region Constants

export type EnumHolder<T> = { [P in keyof T]: T[P] };

export type ExcludeEnum<T, K extends keyof T> = Exclude<keyof T | T[keyof T], K | T[K]>;

export const Constants: {
  ActivityTypes: EnumHolder<typeof ActivityTypes>;
  APIErrors: APIErrors;
  ApplicationCommandOptionTypes: EnumHolder<typeof ApplicationCommandOptionTypes>;
  ApplicationCommandPermissionTypes: EnumHolder<typeof ApplicationCommandPermissionTypes>;
  ApplicationCommandTypes: EnumHolder<typeof ApplicationCommandTypes>;
  ApplicationRoleConnectionMetadataTypes: EnumHolder<typeof ApplicationRoleConnectionMetadataTypes>;
  AutoModerationActionTypes: EnumHolder<typeof AutoModerationActionTypes>;
  AutoModerationRuleEventTypes: EnumHolder<typeof AutoModerationRuleEventTypes>;
  AutoModerationRuleKeywordPresetTypes: EnumHolder<typeof AutoModerationRuleKeywordPresetTypes>;
  AutoModerationRuleTriggerTypes: EnumHolder<typeof AutoModerationRuleTriggerTypes>;
  ChannelTypes: EnumHolder<typeof ChannelTypes>;
  ClientApplicationAssetTypes: ConstantsClientApplicationAssetTypes;
  Colors: ConstantsColors;
  DefaultMessageNotificationLevels: EnumHolder<typeof DefaultMessageNotificationLevels>;
  Endpoints: {
    CDN(root: string): {
      AppAsset(
        appId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ): string;
      AppIcon(
        appId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ): string;
      Asset(name: string): string;
      Avatar(
        userId: Snowflake,
        hash: string,
        format: DynamicImageFormat,
        size: AllowedImageSize,
        dynamic: boolean,
      ): string;
      AvatarDecoration(hash: string): string;
      GuildTagBadge(guildId: Snowflake, hash: string): string;
      Banner(id: Snowflake, hash: string, format: DynamicImageFormat, size: AllowedImageSize, dynamic: boolean): string;
      DefaultAvatar(index: number): string;
      DiscoverySplash(guildId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize): string;
      Emoji(emojiId: Snowflake, format: DynamicImageFormat): string;
      GDMIcon(channelId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize): string;
      GuildMemberAvatar(
        guildId: Snowflake,
        memberId: Snowflake,
        hash: string,
        format?: DynamicImageFormat,
        size?: AllowedImageSize,
        dynamic?: boolean,
      ): string;
      GuildMemberBanner(
        guildId: Snowflake,
        memberId: Snowflake,
        hash: string,
        format?: DynamicImageFormat,
        size?: AllowedImageSize,
        dynamic?: boolean,
      ): string;
      Icon(
        guildId: Snowflake,
        hash: string,
        format: DynamicImageFormat,
        size: AllowedImageSize,
        dynamic: boolean,
      ): string;
      RoleIcon(roleId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize): string;
      Splash(guildId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize): string;
      Sticker(stickerId: Snowflake, stickerFormat: StickerFormatType): string;
      StickerPackBanner(bannerId: Snowflake, format: AllowedImageFormat, size: AllowedImageSize): string;
      TeamIcon(
        teamId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ): string;
      GuildScheduledEventCover(
        scheduledEventId: Snowflake,
        coverHash: string,
        format: AllowedImageFormat,
        size: AllowedImageSize,
      ): string;
    };
    botGateway: string;
    invite(root: string, code: string, eventId?: Snowflake): string;
    scheduledEvent(root: string, guildId: Snowflake, eventId: Snowflake): string;
  };
  Events: ConstantsEvents;
  ExplicitContentFilterLevels: EnumHolder<typeof ExplicitContentFilterLevels>;
  GuildScheduledEventEntityTypes: EnumHolder<typeof GuildScheduledEventEntityTypes>;
  GuildScheduledEventPrivacyLevels: EnumHolder<typeof GuildScheduledEventPrivacyLevels>;
  GuildScheduledEventStatuses: EnumHolder<typeof GuildScheduledEventStatuses>;
  HolographicStyles: {
    PRIMARY: 11_127_295;
    SECONDARY: 16_759_788;
    TERTIARY: 16_761_760;
  };
  IntegrationExpireBehaviors: IntegrationExpireBehaviors[];
  SelectMenuComponentTypes: EnumHolder<typeof SelectMenuComponentTypes>;
  RelationshipTypes: EnumHolder<typeof RelationshipTypes>;
  MembershipStates: EnumHolder<typeof MembershipStates>;
  MessageButtonStyles: EnumHolder<typeof MessageButtonStyles>;
  MessageComponentTypes: EnumHolder<typeof MessageComponentTypes>;
  MessageTypes: MessageType[];
  MFALevels: EnumHolder<typeof MFALevels>;
  NSFWLevels: EnumHolder<typeof NSFWLevels>;
  Opcodes: ConstantsOpcodes;
  VoiceOpcodes: ConstantsVoiceOpcodes;
  OverwriteTypes: EnumHolder<typeof OverwriteTypes>;
  Package: {
    [key: string]: unknown;
    bugs: { url: string };
    dependencies: Record<string, string>;
    description: string;
    devDependencies: Record<string, string>;
    engines: Record<string, string>;
    homepage: string;
    keywords: string[];
    license: string;
    main: string;
    name: string;
    repository: { type: string; url: string };
    scripts: Record<string, string>;
    types: string;
    version: string;
  };
  PartialTypes: {
    [K in PartialTypes]: K;
  };
  PremiumTiers: EnumHolder<typeof PremiumTiers>;
  PrivacyLevels: EnumHolder<typeof PrivacyLevels>;
  ShardEvents: ConstantsShardEvents;
  Status: ConstantsStatus;
  StickerFormatTypes: EnumHolder<typeof StickerFormatTypes>;
  StickerTypes: EnumHolder<typeof StickerTypes>;
  SweeperKeys: SweeperKey[];
  SystemMessageTypes: SystemMessageType[];
  TextBasedChannelTypes: TextBasedChannelTypes[];
  TextInputStyles: EnumHolder<typeof TextInputStyles>;
  ThreadChannelTypes: ThreadChannelTypes[];
  UserAgent: string;
  ciphers: string[];
  VerificationLevels: EnumHolder<typeof VerificationLevels>;
  VideoQualityModes: EnumHolder<typeof VideoQualityModes>;
  VoiceBasedChannelTypes: VoiceBasedChannelTypes[];
  WebhookTypes: EnumHolder<typeof WebhookTypes>;
  WSCodes: {
    1_000: 'WS_CLOSE_REQUESTED';
    1_011: 'INTERNAL_ERROR';
    4_004: 'TOKEN_INVALID';
    4_010: 'SHARDING_INVALID';
    4_011: 'SHARDING_REQUIRED';
    4_013: 'INVALID_INTENTS';
    4_014: 'DISALLOWED_INTENTS';
  };
  WSEvents: {
    [K in WSEventType]: K;
  };
};

export const version: string;

//#endregion

//#region Managers

export abstract class BaseManager {
  protected constructor(client: Client);
  public readonly client: Client;
}

export abstract class DataManager<K, Holds, R> extends BaseManager {
  protected constructor(client: Client, holds: Constructable<Holds>);
  public readonly holds: Constructable<Holds>;
  public readonly cache: Collection<K, Holds>;
  public resolve(resolvable: Holds): Holds;
  public resolve(resolvable: R): Holds | null;
  public resolveId(resolvable: K | Holds): K;
  public resolveId(resolvable: R): K | null;
  public valueOf(): Collection<K, Holds>;
}

export abstract class CachedManager<K, Holds, R> extends DataManager<K, Holds, R> {
  protected constructor(client: Client, holds: Constructable<Holds>, iterable?: Iterable<Holds>);
  private readonly _cache: Collection<K, Holds>;
  private _add(data: unknown, cache?: boolean, { id, extras }?: { id: K; extras: unknown[] }): Holds;
}

export type ApplicationCommandDataResolvable =
  | ApplicationCommandData
  | RESTPostAPIApplicationCommandsJSONBody
  | SlashCommandBuilder
  | ContextMenuCommandBuilder;

export class ApplicationCommandManager<
  ApplicationCommandScope = ApplicationCommand<{ guild: GuildResolvable }>,
  PermissionsOptionsExtras = { guild: GuildResolvable },
  PermissionsGuildType = null,
> extends CachedManager<Snowflake, ApplicationCommandScope, ApplicationCommandResolvable> {
  protected constructor(client: Client, iterable?: Iterable<unknown>);
  public permissions: ApplicationCommandPermissionsManager<
    { command?: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    { command: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    PermissionsOptionsExtras,
    PermissionsGuildType,
    null
  >;
  private commandPath({ id, guildId }: { id?: Snowflake; guildId?: Snowflake }): unknown;
  public create(command: ApplicationCommandDataResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope>;
  public delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope | null>;
  public edit(
    command: ApplicationCommandResolvable,
    data: Partial<ApplicationCommandDataResolvable>,
  ): Promise<ApplicationCommandScope>;
  public edit(
    command: ApplicationCommandResolvable,
    data: Partial<ApplicationCommandDataResolvable>,
    guildId: Snowflake,
  ): Promise<ApplicationCommand>;
  public fetch(
    id: Snowflake,
    options: FetchApplicationCommandOptions & { guildId: Snowflake },
  ): Promise<ApplicationCommand>;
  public fetch(options: FetchApplicationCommandOptions): Promise<Collection<string, ApplicationCommandScope>>;
  public fetch(id: Snowflake, options?: FetchApplicationCommandOptions): Promise<ApplicationCommandScope>;
  public fetch(
    id?: Snowflake,
    options?: FetchApplicationCommandOptions,
  ): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public set(commands: ApplicationCommandDataResolvable[]): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public set(
    commands: ApplicationCommandDataResolvable[],
    guildId: Snowflake,
  ): Promise<Collection<Snowflake, ApplicationCommand>>;
  private static transformCommand(command: ApplicationCommandDataResolvable): RESTPostAPIApplicationCommandsJSONBody;
}

export class ApplicationCommandPermissionsManager<
  BaseOptions,
  FetchSingleOptions,
  FullPermissionsOptions,
  GuildType,
  CommandIdType,
> extends BaseManager {
  private constructor(manager: ApplicationCommandManager | ApplicationCommand);
  private manager: ApplicationCommandManager | ApplicationCommand;

  public client: Client;
  public commandId: CommandIdType;
  public guild: GuildType;
  public guildId: Snowflake | null;
  public add(
    options: FetchSingleOptions & { permissions: ApplicationCommandPermissionData[] },
  ): Promise<ApplicationCommandPermissions[]>;
  public has(options: FetchSingleOptions & { permissionId: UserResolvable | RoleResolvable }): Promise<boolean>;
  public fetch(options: FetchSingleOptions): Promise<ApplicationCommandPermissions[]>;
  public fetch(options: BaseOptions): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;
  public remove(
    options:
      | (FetchSingleOptions & {
          users: UserResolvable | UserResolvable[];
          roles?: RoleResolvable | RoleResolvable[];
        })
      | (FetchSingleOptions & {
          users?: UserResolvable | UserResolvable[];
          roles: RoleResolvable | RoleResolvable[];
        }),
  ): Promise<ApplicationCommandPermissions[]>;
  public set(
    options: FetchSingleOptions & { permissions: ApplicationCommandPermissionData[] },
  ): Promise<ApplicationCommandPermissions[]>;
  public set(
    options: FullPermissionsOptions & {
      fullPermissions: GuildApplicationCommandPermissionData[];
    },
  ): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;
  private permissionsPath(guildId: Snowflake, commandId?: Snowflake): unknown;
  private static transformPermissions(
    permissions: ApplicationCommandPermissionData,
    received: true,
  ): Omit<APIApplicationCommandPermission, 'type'> & { type: keyof ApplicationCommandPermissionTypes };
  private static transformPermissions(permissions: ApplicationCommandPermissionData): APIApplicationCommandPermission;
}

export class BaseGuildEmojiManager extends CachedManager<Snowflake, GuildEmoji, EmojiResolvable> {
  protected constructor(client: Client, iterable?: Iterable<RawGuildEmojiData>);
  public resolveIdentifier(emoji: EmojiIdentifierResolvable): string | null;
}

export class ChannelManager extends CachedManager<Snowflake, AnyChannel, ChannelResolvable> {
  private constructor(client: Client, iterable: Iterable<RawChannelData>);
  public fetch(id: Snowflake, options?: FetchChannelOptions): Promise<AnyChannel | null>;
  public createGroupDM(recipients?: UserResolvable[]): Promise<GroupDMChannel>;
}

export class RelationshipManager extends BaseManager {
  constructor(
    client: Client,
    data: {
      user: RawUserData;
      type: RelationshipTypes;
      since?: string;
      nickname: string | null | undefined;
      id: Snowflake;
    }[],
  );
  public cache: Collection<Snowflake, RelationshipTypes>;
  public friendNicknames: Collection<Snowflake, string | null>;
  public sinceCache: Collection<Snowflake, Date>;
  public readonly friendCache: Collection<Snowflake, User>;
  public readonly blockedCache: Collection<Snowflake, User>;
  public readonly incomingCache: Collection<Snowflake, User>;
  public readonly outgoingCache: Collection<Snowflake, User>;
  public toJSON(): { type: RelationshipTypes; since: string; nickname: string | null | undefined; id: Snowflake }[];
  public resolveId(user: UserResolvable): Snowflake | undefined;
  public fetch(user?: UserResolvable, options?: BaseFetchOptions): Promise<RelationshipTypes | RelationshipManager>;
  public deleteRelationship(user: UserResolvable): Promise<boolean>;
  public sendFriendRequest(options: UserResolvable): Promise<boolean>;
  public addFriend(user: UserResolvable): Promise<boolean>;
  public setNickname(user: UserResolvable, nickname: string | null | undefined): Promise<boolean>;
  public addBlocked(user: UserResolvable): Promise<boolean>;
}

export class UserNoteManager extends BaseManager {
  constructor(client: Client, users: { [key: Snowflake]: string }[]);
  public cache: Collection<Snowflake, string>;
  private _reload(data: { [key: Snowflake]: string }): this;
  public updateNote(id: Snowflake, note: string | null | undefined): Promise<this>;
  public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<string>;
}

export type FetchGuildApplicationCommandFetchOptions = Omit<FetchApplicationCommandOptions, 'guildId'>;

export class ClientUserSettingManager extends BaseManager {
  private constructor(client: Client);
  public readonly raw: RawUserSettingsData;
  public locale?: string;
  public activityDisplay?: boolean;
  public allowDMsFromGuild?: boolean;
  public displayImage?: boolean;
  public linkedImageDisplay?: boolean;
  public autoplayGIF?: boolean;
  public previewLink?: boolean;
  public animatedEmoji?: boolean;
  public allowTTS?: boolean;
  public compactMode?: boolean;
  public convertEmoticons?: boolean;
  public DMScanLevel?: 0 | 1 | 2;
  public theme?: 'dark' | 'light';
  public developerMode?: boolean;
  public afkTimeout?: number;
  public stickerAnimationMode?: 0 | 1 | 2;
  public showEmojiReactions?: boolean;
  public disableDMfromGuilds: Collection<Snowflake, Guild>;
  public fetch(): Promise<this>;
  public edit(data: Partial<RawUserSettingsData>): Promise<this>;
  public toggleCompactMode(): Promise<this>;
  public setTheme(value: 'dark' | 'light'): Promise<this>;
  public setCustomStatus(value?: CustomStatusOption | CustomStatus): Promise<this>;
  public restrictedGuilds(status: boolean): Promise<void>;
  public addRestrictedGuild(guildId: GuildResolvable): Promise<void>;
  public removeRestrictedGuild(guildId: GuildResolvable): Promise<void>;
}

export class GuildSettingManager extends BaseManager {
  private constructor(guild: Guild);
  public readonly raw?: RawGuildSettingsData;
  public suppressEveryone?: boolean;
  public suppressRoles?: boolean;
  public muteScheduledEvents?: boolean;
  public messageNotifications?: number;
  public flags?: number;
  public mobilePush?: boolean;
  public muted?: boolean;
  public muteConfig?: MuteConfigData;
  public hideMutedChannels?: boolean;
  public channelOverrides?: object[];
  public notifyHighlights?: number;
  public version?: number;
  public guildId?: Snowflake;
  public readonly guild?: Guild;
  public edit(data: Partial<RawGuildSettingsData>): Promise<this>;
}

export interface CustomStatusOption {
  text?: string | null;
  expires_at?: string | null;
  emoji?: EmojiIdentifierResolvable | null;
  status?: PresenceStatusData | null;
}

// Source: https://luna.gitlab.io/discord-unofficial-docs/user_settings.html
export interface RawUserSettingsData {
  afk_timeout?: number;
  allow_accessibility_detection?: boolean;
  animate_emoji?: boolean;
  animate_stickers?: number;
  contact_sync_enabled?: boolean;
  convert_emoticons?: boolean;
  custom_status?: { text?: string; expires_at?: string | null; emoji_name?: string; emoji_id?: Snowflake | null };
  default_guilds_restricted?: boolean;
  detect_platform_accounts?: boolean;
  developer_mode?: boolean;
  disable_games_tab?: boolean;
  enable_tts_command?: boolean;
  explicit_content_filter?: number;
  friend_discovery_flags?: number;
  friend_source_flags?: { all?: boolean; mutual_friends?: boolean; mututal_guilds?: boolean };
  gif_auto_play?: boolean;
  guild_folders?: { id?: Snowflake; guild_ids?: Snowflake[]; name?: string }[];
  guild_positions?: number[];
  inline_attachment_media?: boolean;
  inline_embed_media?: boolean;
  locale?: string;
  message_display_compact?: boolean;
  native_phone_integration_enabled?: boolean;
  render_embeds?: boolean;
  render_reactions?: boolean;
  restricted_guilds?: any[];
  show_current_game?: boolean;
  status?: PresenceStatusData;
  stream_notifications_enabled?: boolean;
  theme?: 'dark' | 'light';
  timezone_offset?: number;
  view_nsfw_guilds?: boolean;
}

export interface RawGuildSettingsData {
  guild_id: Snowflake;
  suppress_everyone: boolean;
  suppress_roles: boolean;
  mute_scheduled_events: boolean;
  message_notifications: 2;
  flags: 0;
  mobile_push: boolean;
  muted: boolean;
  mute_config?: RawMuteConfigData;
  hide_muted_channels: boolean;
  channel_overrides: RawGuildChannelSettingsData[];
  notify_highlights: number;
  version: number;
}

export interface RawGuildChannelSettingsData {
  channel_id: Snowflake;
  message_notifications: number;
  muted: boolean;
  mute_config?: RawMuteConfigData;
  collapsed: boolean;
}

export interface RawMuteConfigData {
  end_time: string;
  selected_time_window: number;
}

export interface MuteConfigData {
  endTime: Date;
  selectedTimeWindow: number;
}

export type MappedGuildChannelTypes = EnumValueMapped<
  typeof ChannelTypes,
  {
    GUILD_CATEGORY: CategoryChannel;
  }
> &
  MappedChannelCategoryTypes;

export type GuildChannelTypes = CategoryChannelTypes | ChannelTypes.GUILD_CATEGORY | 'GUILD_CATEGORY';

export class GuildChannelManager extends CachedManager<Snowflake, GuildBasedChannel, GuildChannelResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildChannelData>);
  public readonly channelCountWithoutThreads: number;
  public guild: Guild;

  public create<T extends Exclude<GuildChannelTypes, 'GUILD_STORE' | ChannelTypes.GUILD_STORE>>(
    name: string,
    options: GuildChannelCreateOptions & { type: T },
  ): Promise<MappedGuildChannelTypes[T]>;

  /** @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/6309018858647) for more information */
  public create(
    name: string,
    options: GuildChannelCreateOptions & { type: 'GUILD_STORE' | ChannelTypes.GUILD_STORE },
  ): Promise<StoreChannel>;
  public create(name: string, options?: GuildChannelCreateOptions): Promise<TextChannel>;
  public createWebhook(
    channel: GuildChannelResolvable,
    name: string,
    options?: TextChannel | NewsChannel | VoiceChannel | StageChannel | ForumChannel | MediaChannel | Snowflake,
  ): Promise<Webhook>;
  public addFollower(
    channel: NewsChannel | Snowflake,
    targetChannel: TextChannelResolvable,
    reason?: string,
  ): Promise<Snowflake>;
  public edit(channel: GuildChannelResolvable, data: ChannelData, reason?: string): Promise<GuildChannel>;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildBasedChannel | null>;
  public fetch(
    id?: undefined,
    options?: BaseFetchOptions,
  ): Promise<Collection<Snowflake, NonThreadGuildBasedChannel | null>>;
  public fetchWebhooks(channel: GuildChannelResolvable): Promise<Collection<Snowflake, Webhook>>;
  public setPosition(
    channel: GuildChannelResolvable,
    position: number,
    options?: SetChannelPositionOptions,
  ): Promise<GuildChannel>;
  public setPositions(channelPositions: readonly ChannelPosition[]): Promise<Guild>;
  public delete(channel: GuildChannelResolvable, reason?: string): Promise<void>;
}

export class GuildEmojiManager extends BaseGuildEmojiManager {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildEmojiData>);
  public guild: Guild;
  public create(
    attachment: BufferResolvable | Base64Resolvable,
    name: string,
    options?: GuildEmojiCreateOptions,
  ): Promise<GuildEmoji>;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildEmoji>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, GuildEmoji>>;
  public fetchAuthor(emoji: EmojiResolvable): Promise<User>;
  public delete(emoji: EmojiResolvable, reason?: string): Promise<void>;
  public edit(emoji: EmojiResolvable, data: GuildEmojiEditData, reason?: string): Promise<GuildEmoji>;
}

export class GuildEmojiRoleManager extends DataManager<Snowflake, Role, RoleResolvable> {
  private constructor(emoji: GuildEmoji);
  public emoji: GuildEmoji;
  public guild: Guild;
  public add(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
  ): Promise<GuildEmoji>;
  public set(roles: readonly RoleResolvable[] | Collection<Snowflake, Role>): Promise<GuildEmoji>;
  public remove(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
  ): Promise<GuildEmoji>;
}

export class GuildManager extends CachedManager<Snowflake, Guild, GuildResolvable> {
  private constructor(client: Client, iterable?: Iterable<RawGuildData>);
  public create(name: string, options?: GuildCreateOptions): Promise<Guild>;
  public fetch(options: Snowflake | FetchGuildOptions): Promise<Guild>;
  public fetch(options?: FetchGuildsOptions): Promise<Collection<Snowflake, OAuth2Guild>>;
  public setIncidentActions(
    guild: GuildResolvable,
    incidentActions: IncidentActionsEditOptions,
  ): Promise<IncidentActions>;
}

export class GuildMemberManager extends CachedManager<Snowflake, GuildMember, GuildMemberResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildMemberData>);
  public guild: Guild;
  public get me(): GuildMember | null;
  public add(
    user: UserResolvable,
    options: AddGuildMemberOptions & { fetchWhenExisting: false },
  ): Promise<GuildMember | null>;
  public add(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember>;
  public addRole(user: UserResolvable, role: RoleResolvable, reason?: string): Promise<GuildMember | User | Snowflake>;
  public ban(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;
  public edit(user: UserResolvable, data: GuildMemberEditData, reason?: string): Promise<GuildMember>;
  public fetch(
    options: UserResolvable | FetchMemberOptions | (FetchMembersOptions & { user: UserResolvable }),
  ): Promise<GuildMember>;
  public fetch(options?: FetchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;
  public fetchMe(options?: BaseFetchOptions): Promise<GuildMember>;
  public kick(user: UserResolvable, reason?: string): Promise<GuildMember | User | Snowflake>;
  public prune(options: GuildPruneMembersOptions & { dry?: false; count: false }): Promise<null>;
  public prune(options?: GuildPruneMembersOptions): Promise<number>;
  public removeRole(
    user: UserResolvable,
    role: RoleResolvable,
    reason?: string,
  ): Promise<GuildMember | User | Snowflake>;
  public search(options: GuildSearchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;
  public unban(user: UserResolvable, reason?: string): Promise<User | null>;
  public fetchByMemberSafety(timeout?: number): Promise<Collection<Snowflake, GuildMember>>;
  /** @deprecated This method will not be usable until an effective MFA implementation is in place. */
  public bulkBan(
    users: Collection<Snowflake, UserResolvable> | readonly UserResolvable[],
    options?: BulkBanOptions,
  ): Promise<BulkBanResult>;
}

export class GuildBanManager extends CachedManager<Snowflake, GuildBan, GuildBanResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildBanData>);
  public guild: Guild;
  public create(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;
  public fetch(options: UserResolvable | FetchBanOptions): Promise<GuildBan>;
  public fetch(options?: FetchBansOptions): Promise<Collection<Snowflake, GuildBan>>;
  public remove(user: UserResolvable, reason?: string): Promise<User | null>;
  /** @deprecated This method will not be usable until an effective MFA implementation is in place. */
  public bulkCreate(
    users: Collection<Snowflake, UserResolvable> | readonly UserResolvable[],
    options?: BulkBanOptions,
  ): Promise<BulkBanResult>;
}

export class GuildInviteManager extends DataManager<string, Invite, InviteResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawInviteData>);
  public guild: Guild;
  public create(channel: GuildInvitableChannelResolvable, options?: CreateInviteOptions): Promise<Invite>;
  public fetch(options: InviteResolvable | FetchInviteOptions): Promise<Invite>;
  public fetch(options?: FetchInvitesOptions): Promise<Collection<string, Invite>>;
  public delete(invite: InviteResolvable, reason?: string): Promise<Invite>;
}

export class GuildScheduledEventManager extends CachedManager<
  Snowflake,
  GuildScheduledEvent,
  GuildScheduledEventResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildScheduledEventData>);
  public guild: Guild;
  public create(options: GuildScheduledEventCreateOptions): Promise<GuildScheduledEvent>;
  public fetch(): Promise<Collection<Snowflake, GuildScheduledEvent>>;
  public fetch<
    T extends GuildScheduledEventResolvable | FetchGuildScheduledEventOptions | FetchGuildScheduledEventsOptions,
  >(options?: T): Promise<GuildScheduledEventManagerFetchResult<T>>;
  public edit<S extends GuildScheduledEventStatus, T extends GuildScheduledEventSetStatusArg<S>>(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options: GuildScheduledEventEditOptions<S, T>,
  ): Promise<GuildScheduledEvent<T>>;
  public delete(guildScheduledEvent: GuildScheduledEventResolvable): Promise<void>;
  public fetchSubscribers<T extends FetchGuildScheduledEventSubscribersOptions>(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options?: T,
  ): Promise<GuildScheduledEventManagerFetchSubscribersResult<T>>;
}

export class GuildStickerManager extends CachedManager<Snowflake, Sticker, StickerResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawStickerData>);
  public guild: Guild;
  public create(
    file: BufferResolvable | Stream | FileOptions | MessageAttachment,
    name: string,
    tags: string,
    options?: GuildStickerCreateOptions,
  ): Promise<Sticker>;
  public edit(sticker: StickerResolvable, data?: GuildStickerEditData, reason?: string): Promise<Sticker>;
  public delete(sticker: StickerResolvable, reason?: string): Promise<void>;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Sticker>;
  public fetch(id?: Snowflake, options?: BaseFetchOptions): Promise<Collection<Snowflake, Sticker>>;
  public fetchUser(sticker: StickerResolvable): Promise<User | null>;
}

export class GuildMemberRoleManager extends DataManager<Snowflake, Role, RoleResolvable> {
  private constructor(member: GuildMember);
  public readonly hoist: Role | null;
  public readonly icon: Role | null;
  public readonly color: Role | null;
  public readonly highest: Role;
  public readonly premiumSubscriberRole: Role | null;
  public readonly botRole: Role | null;
  public member: GuildMember;
  public guild: Guild;

  public add(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
    reason?: string,
  ): Promise<GuildMember>;
  public set(roles: readonly RoleResolvable[] | Collection<Snowflake, Role>, reason?: string): Promise<GuildMember>;
  public remove(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
    reason?: string,
  ): Promise<GuildMember>;
}

export class MessageManager extends CachedManager<Snowflake, Message, MessageResolvable> {
  private constructor(channel: TextBasedChannel, iterable?: Iterable<RawMessageData>);
  public channel: TextBasedChannel;
  public cache: Collection<Snowflake, Message>;
  public crosspost(message: MessageResolvable): Promise<Message>;
  public delete(message: MessageResolvable): Promise<void>;
  public edit(message: MessageResolvable, options: string | MessagePayload | MessageEditOptions): Promise<Message>;
  public fetch(message: Snowflake, options?: BaseFetchOptions): Promise<Message>;
  public fetch(
    options?: ChannelLogsQueryOptions,
    cacheOptions?: BaseFetchOptions,
  ): Promise<Collection<Snowflake, Message>>;
  public fetchPinned(cache?: boolean): Promise<Collection<Snowflake, Message>>;
  public react(message: MessageResolvable, emoji: EmojiIdentifierResolvable, burst?: boolean): Promise<void>;
  public pin(message: MessageResolvable, reason?: string): Promise<void>;
  public unpin(message: MessageResolvable, reason?: string): Promise<void>;
  public search(options: MessageSearchOptions): Promise<MessageSearchResult>;
  public endPoll(messageId: Snowflake): Promise<Message>;
  public fetchPollAnswerVoters(options: FetchPollAnswerVotersOptions): Promise<Collection<Snowflake, User>>;
}

export interface MessageSearchOptions {
  authors: UserResolvable[];
  content: string;
  mentions: UserResolvable[];
  has: ('link' | 'embed' | 'file' | 'video' | 'image' | 'sound' | 'sticker')[];
  maxId: Snowflake;
  minId: Snowflake;
  channels: TextChannelResolvable[];
  pinned: boolean;
  nsfw: boolean;
  offset: number;
  limit: number;
  sortBy: 'relevant' | 'timestamp';
  sortOrder: 'asc' | 'desc';
}

export interface MessageSearchResult {
  messages: Collection<Snowflake, Message>;
  total: number;
}

export class PermissionOverwriteManager extends CachedManager<
  Snowflake,
  PermissionOverwrites,
  PermissionOverwriteResolvable
> {
  private constructor(client: Client, iterable?: Iterable<RawPermissionOverwriteData>);
  public set(
    overwrites: readonly OverwriteResolvable[] | Collection<Snowflake, OverwriteResolvable>,
    reason?: string,
  ): Promise<NonThreadGuildBasedChannel>;
  private upsert(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
    existing?: PermissionOverwrites,
  ): Promise<NonThreadGuildBasedChannel>;
  public create(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
  ): Promise<NonThreadGuildBasedChannel>;
  public edit(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
  ): Promise<NonThreadGuildBasedChannel>;
  public delete(userOrRole: RoleResolvable | UserResolvable, reason?: string): Promise<NonThreadGuildBasedChannel>;
}

export class PresenceManager extends CachedManager<Snowflake, Presence, PresenceResolvable> {
  private constructor(client: Client, iterable?: Iterable<RawPresenceData>);
  public fetch(): Promise<Collection<Snowflake, Presence>>;
}

export class ReactionManager extends CachedManager<Snowflake | string, MessageReaction, MessageReactionResolvable> {
  private constructor(message: Message, iterable?: Iterable<RawMessageReactionData>);
  public message: Message;
  public removeAll(): Promise<Message>;
}

export class ReactionUserManager extends CachedManager<Snowflake, User, UserResolvable> {
  private constructor(reaction: MessageReaction, iterable?: Iterable<RawUserData>);
  public reaction: MessageReaction;
  public fetch(options?: FetchReactionUsersOptions): Promise<Collection<Snowflake, User>>;
  public remove(user?: UserResolvable): Promise<MessageReaction>;
}

export class RoleManager extends CachedManager<Snowflake, Role, RoleResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawRoleData>);
  public readonly everyone: Role;
  public readonly highest: Role;
  public guild: Guild;
  public readonly premiumSubscriberRole: Role | null;
  public botRoleFor(user: UserResolvable): Role | null;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Role | null>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, Role>>;
  public create(options?: CreateRoleOptions): Promise<Role>;
  public edit(role: RoleResolvable, options: RoleData, reason?: string): Promise<Role>;
  public delete(role: RoleResolvable, reason?: string): Promise<void>;
  public setPosition(role: RoleResolvable, position: number, options?: SetRolePositionOptions): Promise<Role>;
  public setPositions(rolePositions: readonly RolePosition[]): Promise<Guild>;
  public comparePositions(role1: RoleResolvable, role2: RoleResolvable): number;
  public fetchMemberCounts(): Promise<Record<Snowflake, number>>;
  public fetchMemberIds(role: RoleResolvable): Promise<Snowflake[]>;
}

export class StageInstanceManager extends CachedManager<Snowflake, StageInstance, StageInstanceResolvable> {
  private constructor(guild: Guild, iterable?: Iterable<RawStageInstanceData>);
  public guild: Guild;
  public create(channel: StageChannelResolvable, options: StageInstanceCreateOptions): Promise<StageInstance>;
  public fetch(channel: StageChannelResolvable, options?: BaseFetchOptions): Promise<StageInstance>;
  public edit(channel: StageChannelResolvable, options: StageInstanceEditOptions): Promise<StageInstance>;
  public delete(channel: StageChannelResolvable): Promise<void>;
}

export class ThreadManager extends CachedManager<Snowflake, ThreadChannel, ThreadChannelResolvable> {
  protected constructor(channel: TextChannel | NewsChannel, iterable?: Iterable<RawThreadChannelData>);
  public channel: TextChannel | NewsChannel;
  public fetch(options: ThreadChannelResolvable, cacheOptions?: BaseFetchOptions): Promise<ThreadChannel | null>;
  public fetch(options?: FetchChannelThreadsOptions, cacheOptions?: { cache?: boolean }): Promise<FetchedThreads>;
  public fetchArchived(options?: FetchChannelThreadsOptions, cache?: boolean): Promise<FetchedThreads>;
  public fetchActive(cache?: boolean, options?: FetchChannelThreadsOptions): Promise<FetchedThreads>;
}

export class GuildTextThreadManager<AllowedThreadType> extends ThreadManager {
  public create(options: GuildTextThreadCreateOptions<AllowedThreadType>): Promise<ThreadChannel>;
}

export class GuildForumThreadManager extends ThreadManager {
  public create(options: GuildForumThreadCreateOptions): Promise<ThreadChannel>;
}

export class ThreadMemberManager extends CachedManager<Snowflake, ThreadMember, ThreadMemberResolvable> {
  private constructor(thread: ThreadChannel, iterable?: Iterable<RawThreadMemberData>);
  public thread: ThreadChannel;
  public get me(): ThreadMember | null;
  public add(member: UserResolvable | '@me', reason?: string): Promise<Snowflake>;
  public fetch(options?: FetchThreadMembersWithoutGuildMemberDataOptions): Promise<Collection<Snowflake, ThreadMember>>;
  public fetch(member: ThreadMember<true>, options?: FetchMemberOptions): Promise<ThreadMember<true>>;
  public fetch(
    member: Snowflake,
    options: FetchThreadMemberOptions & { withMember: true },
  ): Promise<ThreadMember<true>>;
  public fetch(
    options: FetchThreadMembersWithGuildMemberDataOptions,
  ): Promise<Collection<Snowflake, ThreadMember<true>>>;
  public fetch(member: UserResolvable, options?: FetchThreadMemberOptions): Promise<ThreadMember>;

  /** @deprecated Use `fetch(options)` instead. */
  public fetch(cache: boolean, options?: FetchThreadMembersOptions): Promise<Collection<Snowflake, ThreadMember>>;

  public fetch(
    x: undefined,
    options: FetchThreadMembersWithGuildMemberDataOptions,
  ): Promise<Collection<Snowflake, ThreadMember<true>>>;
  public fetch(
    x: undefined,
    options?: FetchThreadMembersWithoutGuildMemberDataOptions,
  ): Promise<Collection<Snowflake, ThreadMember>>;

  public fetchMe(options?: BaseFetchOptions): Promise<ThreadMember>;
  public remove(id: Snowflake | '@me', reason?: string): Promise<Snowflake>;
}

export class UserManager extends CachedManager<Snowflake, User, UserResolvable> {
  private constructor(client: Client, iterable?: Iterable<RawUserData>);
  private dmChannel(userId: Snowflake): DMChannel | null;
  public createDM(user: UserResolvable, options?: BaseFetchOptions): Promise<DMChannel>;
  public deleteDM(user: UserResolvable): Promise<DMChannel>;
  public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<User>;
  public send(user: UserResolvable, options: string | MessagePayload | MessageOptions): Promise<Message>;
}

export class VoiceStateManager extends CachedManager<Snowflake, VoiceState, typeof VoiceState> {
  private constructor(guild: Guild, iterable?: Iterable<RawVoiceStateData>);
  public guild: Guild;
  public fetch(member: GuildMemberResolvable | '@me', options?: BaseFetchOptions): Promise<VoiceState>;
}

//#endregion

//#region Mixins

// Model the TextBasedChannel mixin system, allowing application of these fields
// to the classes that use these methods without having to manually add them
// to each of those classes

export type Constructable<T> = abstract new (...args: any[]) => T;
export function PartialTextBasedChannel<T>(Base?: Constructable<T>): Constructable<T & PartialTextBasedChannelFields>;
export function TextBasedChannelMixin<T, I extends keyof TextBasedChannelFields = never>(
  Base?: Constructable<T>,
  ignore?: I[],
): Constructable<T & Omit<TextBasedChannelFields, I>>;

export interface PartialTextBasedChannelFields {
  send(options: string | MessagePayload | MessageOptions): Promise<Message>;
}

export interface TextBasedChannelFields extends PartialTextBasedChannelFields {
  lastMessageId: Snowflake | null;
  readonly lastMessage: Message | null;
  lastPinTimestamp: number | null;
  readonly lastPinAt: Date | null;
  messages: MessageManager;
  awaitMessages(options?: AwaitMessagesOptions): Promise<Collection<Snowflake, Message>>;
  createMessageCollector(options?: MessageCollectorOptions): MessageCollector;
  createWebhook(name: string, options?: ChannelWebhookCreateOptions): Promise<Webhook>;
  setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<this>;
  setNSFW(nsfw?: boolean, reason?: string): Promise<this>;
  fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;
  sendTyping(): Promise<{ message_send_cooldown_ms: number; thread_create_cooldown_ms: number } | undefined>;
  sendSlash(target: UserResolvable, commandName: string, ...args: any[]): Promise<Message | Modal>;
}

export function PartialWebhookMixin<T>(Base?: Constructable<T>): Constructable<T & PartialWebhookFields>;
export function WebhookMixin<T>(Base?: Constructable<T>): Constructable<T & WebhookFields>;

export interface PartialWebhookFields {
  id: Snowflake;
  readonly url: string;
  deleteMessage(message: MessageResolvable | APIMessage | '@original', threadId?: Snowflake): Promise<void>;
  editMessage(
    message: MessageResolvable | '@original',
    options: string | MessagePayload | WebhookEditMessageOptions,
  ): Promise<Message | APIMessage>;
  fetchMessage(message: Snowflake | '@original', options?: WebhookFetchMessageOptions): Promise<Message | APIMessage>;
  /* tslint:disable:unified-signatures */
  /** @deprecated */
  fetchMessage(message: Snowflake | '@original', cache?: boolean): Promise<Message | APIMessage>;
  /* tslint:enable:unified-signatures */
  send(options: string | MessagePayload | Omit<WebhookMessageOptions, 'flags'>): Promise<Message | APIMessage>;
}

export interface WebhookFields extends PartialWebhookFields {
  readonly createdAt: Date;
  readonly createdTimestamp: number;
  delete(reason?: string): Promise<void>;
  edit(options: WebhookEditData, reason?: string): Promise<Webhook>;
  sendSlackMessage(body: unknown): Promise<boolean>;
}

//#endregion

//#region Typedefs

export type ActivityFlagsString =
  | 'INSTANCE'
  | 'JOIN'
  | 'SPECTATE'
  | 'JOIN_REQUEST'
  | 'SYNC'
  | 'PLAY'
  | 'PARTY_PRIVACY_FRIENDS'
  | 'PARTY_PRIVACY_VOICE_CHANNEL'
  | 'EMBEDDED';

export type PurchasedFlagsString = 'NITRO_CLASSIC' | 'NITRO' | 'GUILD_BOOST' | 'NITRO_BASIC';

export type PremiumUsageFlagsString = 'PREMIUM_DISCRIMINATOR' | 'ANIMATED_AVATAR' | 'PROFILE_BANNER';

export type InviteFlagsString = 'IS_GUEST_INVITE' | 'IS_VIEWED' | 'IS_ENHANCED' | 'IS_APPLICATION_BYPASS';

export type ActivitiesOptions = Omit<ActivityOptions, 'shardId'>;

export interface ActivityOptions {
  name: string;
  state?: string;
  url?: string;
  type?: ActivityType;
  shardId?: number | readonly number[];
}

export type ActivityPlatform = 'desktop' | 'samsung' | 'xbox' | 'ios' | 'android' | 'embedded' | 'ps4' | 'ps5';

export type ActivityType = keyof typeof ActivityTypes;

export interface AddGuildMemberOptions {
  accessToken: string;
  nick?: string;
  roles?: Collection<Snowflake, Role> | RoleResolvable[];
  mute?: boolean;
  deaf?: boolean;
  force?: boolean;
  fetchWhenExisting?: boolean;
}

export type AllowedImageFormat = 'webp' | 'png' | 'jpg' | 'jpeg';

export type AllowedImageSize = 16 | 32 | 56 | 64 | 96 | 128 | 256 | 300 | 512 | 600 | 1024 | 2048 | 4096;

export type AllowedPartial =
  | User
  | Channel
  | GuildMember
  | Message
  | MessageReaction
  | GuildScheduledEvent
  | ThreadMember;

export type AllowedThreadTypeForNewsChannel = 'GUILD_NEWS_THREAD' | 10;

export type AllowedThreadTypeForTextChannel = 'GUILD_PUBLIC_THREAD' | 'GUILD_PRIVATE_THREAD' | 11 | 12;

export interface ClientApplicationInstallParams {
  scopes: InviteScope[];
  permissions: Readonly<Permissions>;
}

export interface APIErrors {
  UNKNOWN_ACCOUNT: 10001;
  UNKNOWN_APPLICATION: 10002;
  UNKNOWN_CHANNEL: 10003;
  UNKNOWN_GUILD: 10004;
  UNKNOWN_INTEGRATION: 10005;
  UNKNOWN_INVITE: 10006;
  UNKNOWN_MEMBER: 10007;
  UNKNOWN_MESSAGE: 10008;
  UNKNOWN_OVERWRITE: 10009;
  UNKNOWN_PROVIDER: 10010;
  UNKNOWN_ROLE: 10011;
  UNKNOWN_TOKEN: 10012;
  UNKNOWN_USER: 10013;
  UNKNOWN_EMOJI: 10014;
  UNKNOWN_WEBHOOK: 10015;
  UNKNOWN_WEBHOOK_SERVICE: 10016;
  UNKNOWN_SESSION: 10020;
  UNKNOWN_BAN: 10026;
  UNKNOWN_SKU: 10027;
  UNKNOWN_STORE_LISTING: 10028;
  UNKNOWN_ENTITLEMENT: 10029;
  UNKNOWN_BUILD: 10030;
  UNKNOWN_LOBBY: 10031;
  UNKNOWN_BRANCH: 10032;
  UNKNOWN_STORE_DIRECTORY_LAYOUT: 10033;
  UNKNOWN_REDISTRIBUTABLE: 10036;
  UNKNOWN_GIFT_CODE: 10038;
  UNKNOWN_STREAM: 10049;
  UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN: 10050;
  UNKNOWN_GUILD_TEMPLATE: 10057;
  UNKNOWN_DISCOVERABLE_SERVER_CATEGORY: 10059;
  UNKNOWN_STICKER: 10060;
  UNKNOWN_INTERACTION: 10062;
  UNKNOWN_APPLICATION_COMMAND: 10063;
  UNKNOWN_APPLICATION_COMMAND_PERMISSIONS: 10066;
  UNKNOWN_STAGE_INSTANCE: 10067;
  UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM: 10068;
}
