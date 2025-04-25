import { dataSource } from '../config/typeorm';
import { UserEntity, ProfileEntity } from './user.model';
import { PermissionEntity, RoleEntity, RolePermissionEntity } from './role.model';
// import { BrandContentEntity, BrandEntity } from './brand.model';
// import { CartEntity } from './cart.model';
// import { CategoryContentEntity, CategoryEntity } from './category.model';
// import { ChatMessageEntity, ChatRoomEntity, ChatRoomUserEntity } from './chat.model';
// import { ColorContentEntity, ColorEntity } from './color.model';
// import { PartenerEntity } from './partener.model';
// import { PointContentEntity, PointEntity, PointHistoryEntity } from './point.model';
// import {
//   ProductAttributeContentEntity,
//   ProductAttributeEntity,
//   ProductContentEntity,
//   ProductEntity,
//   ProductLikeEntity,
//   ProductMediaEntity,
//   ProductVariantEntity,
//   variantStockEntity,
// } from './product.model';
// import { RateActionEntity, RateEntity } from './rate.model';
// import { RevenuePercentageChunks } from './revenue-percentage.model';
// import { SizeContentEntity, SizeEntity } from './size.model';
// import { SeasonContentEntity, SeasonEntity } from './season.model';
// import { SupplierRequestEntity } from './supplier-request.model';
// import { TicketEntity } from './ticket.model';
// import { WalletTransactionEntity } from './wallet-transaction.model';
// import { WarehouseEntity } from './warehouse.model';
// import { CountryEntity } from './country.model';
// import { RegionEntity } from './region.model';
// import {
//   ArticleCategoryContentEntity,
//   ArticleCategoryEntity,
//   ArticleCommentEntity,
//   ArticleEntity,
//   ArticleSubscriptionEntity,
// } from './article.model';
// import {
//   OfferContentEntity,
//   OfferCountriesEntity,
//   OfferEntity,
//   OfferProductEntity,
//   OfferTierEntity,
//   OfferUsersEntity,
// } from './offer.model';

const User = dataSource.getRepository(UserEntity);
const Profile = dataSource.getRepository(ProfileEntity);
const Role = dataSource.getRepository(RoleEntity);
const Permission = dataSource.getRepository(PermissionEntity);
const RolePermission = dataSource.getRepository(RolePermissionEntity);
// const Brand = dataSource.getRepository(BrandEntity);
// const Cart = dataSource.getRepository(CartEntity);
// const Category = dataSource.getRepository(CategoryEntity);
// const CategoryTree = dataSource.getTreeRepository(CategoryEntity);
// const CategoryContent = dataSource.getRepository(CategoryContentEntity);
// const ChatMessage = dataSource.getRepository(ChatMessageEntity);
// const ChatRoom = dataSource.getRepository(ChatRoomEntity);
// const ChatRoomUser = dataSource.getRepository(ChatRoomUserEntity);
// const Color = dataSource.getRepository(ColorEntity);
// const ColorTree = dataSource.getTreeRepository(ColorEntity);
// const ColorContent = dataSource.getRepository(ColorContentEntity);
// const Partener = dataSource.getRepository(PartenerEntity);
// const Point = dataSource.getRepository(PointEntity);
// const PointContent = dataSource.getRepository(PointContentEntity);
// const PointHistory = dataSource.getRepository(PointHistoryEntity);
// const Product = dataSource.getRepository(ProductEntity);
// const ProductContent = dataSource.getRepository(ProductContentEntity);
// const ProductAttribute = dataSource.getRepository(ProductAttributeEntity);
// const ProductAttributeContent = dataSource.getRepository(ProductAttributeContentEntity);
// const ProductLike = dataSource.getRepository(ProductLikeEntity);
// const ProductMedia = dataSource.getRepository(ProductMediaEntity);
// const ProductVariant = dataSource.getRepository(ProductVariantEntity);
// const VariantStock = dataSource.getRepository(variantStockEntity);
// const Rate = dataSource.getRepository(RateEntity);
// const RateAction = dataSource.getRepository(RateActionEntity);
// const RevenuePercentage = dataSource.getRepository(RevenuePercentageChunks);
// const Size = dataSource.getRepository(SizeEntity);
// const SizeTree = dataSource.getTreeRepository(SizeEntity);
// const SizeContent = dataSource.getRepository(SizeContentEntity);
// const Season = dataSource.getRepository(SeasonEntity);
// const SeasonContent = dataSource.getRepository(SeasonContentEntity);
// const SupplierRequest = dataSource.getRepository(SupplierRequestEntity);
// const Ticket = dataSource.getRepository(TicketEntity);
// const WalletTransaction = dataSource.getRepository(WalletTransactionEntity);
// const Warehouse = dataSource.getRepository(WarehouseEntity);
// const SupploerRequest = dataSource.getRepository(SupplierRequestEntity);
// const Country = dataSource.getRepository(CountryEntity);
// const BrandContent = dataSource.getRepository(BrandContentEntity);
// const RevenuPercentage = dataSource.getRepository(RevenuePercentageChunks);
// const Region = dataSource.getRepository(RegionEntity);
// const Article = dataSource.getRepository(ArticleEntity);
// const ArticleCategory = dataSource.getRepository(ArticleCategoryEntity);
// const ArticleCategoryContent = dataSource.getRepository(ArticleCategoryContentEntity);
// const ArticleComment = dataSource.getRepository(ArticleCommentEntity);
// const ArticleSubscription = dataSource.getRepository(ArticleSubscriptionEntity);
// const Offer = dataSource.getRepository(OfferEntity);
// const OfferContent = dataSource.getRepository(OfferContentEntity);
// const OfferCountries = dataSource.getRepository(OfferCountriesEntity);
// const OfferProduct = dataSource.getRepository(OfferProductEntity);
// const OfferTier = dataSource.getRepository(OfferTierEntity);
// const OfferUsers = dataSource.getRepository(OfferUsersEntity);

export const Models = {
  User,
  Role,
  Profile,
  // BrandContent,
  // RolePermission,
  Permission,
  // Brand,
  // Cart,
  // Category,
  // CategoryTree,
  // CategoryContent,
  // ChatMessage,
  // ChatRoom,
  // ChatRoomUser,
  // Color,
  // ColorTree,
  // ColorContent,
  // Partener,
  // Point,
  // PointContent,
  // PointHistory,
  // Product,
  // ProductContent,
  // ProductAttribute,
  // ProductAttributeContent,
  // ProductLike,
  // ProductMedia,
  // ProductVariant,
  // VariantStock,
  // Rate,
  // RateAction,
  // RevenuePercentage,
  // Size,
  // SizeTree,
  // SizeContent,
  // Season,
  // SeasonContent,
  // SupplierRequest,
  // Ticket,
  // WalletTransaction,
  // Warehouse,
  // SupploerRequest,
  // Country,
  // RevenuPercentage,
  // Region,
  // Article,
  // ArticleCategory,
  // ArticleCategoryContent,
  // ArticleComment,
  // ArticleSubscription,
  // OfferUsers,
  // Offer,
  // OfferContent,
  // OfferTier,
  // OfferCountries,
};
