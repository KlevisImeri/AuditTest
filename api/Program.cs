using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.Features;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.HostFiltering;

var builder = WebApplication.CreateBuilder(args);

// Add logging configuration
builder.Logging.AddDebug();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Audit.db"));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

 
// Configure JWT authentication
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});


// Kestrel configuration with HTTPS
// builder.WebHost.ConfigureKestrel(serverOptions =>
// {
//     serverOptions.ListenAnyIP(443, listenOptions =>
//     {
//         var certificate = X509Certificate2.CreateFromPemFile(
//             "/etc/ssl/certs/domain.cert.pem",
//             "/etc/ssl/private/private.key.pem"
//         );
//         listenOptions.UseHttps(options => {
//             options.ServerCertificate = certificate;
//             options.ServerCertificateSelector = (connectionContext, name) => {
//                 return certificate;
//             };
//         });
//     });
//     
//     serverOptions.Limits.MaxRequestBodySize = long.MaxValue;
// });


// builder.Services.Configure<HostFilteringOptions>(options =>
// {
//     options.AllowedHosts = new List<string>
//     {
//         "api.shkf-ks.org",
//         "[2a02:ab88:c0c:4c00:9cb6:b921:5967:4365]",
//         "[2a02:ab88:c0c:4c00::3299]"
//         "localhost"
//     };
// });

// File upload configuration
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = long.MaxValue;
});

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run("http://*:9000");
