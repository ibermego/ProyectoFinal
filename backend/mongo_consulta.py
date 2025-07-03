import pandas as pd
from pymongo import MongoClient

# URI para conectar a MongoDB
uri = "mongodb+srv://mongodb:mongodb@nzcluster-01.wwv07cx.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=NZCluster-01"


# Conectar con MongoDB
client = MongoClient(uri)

# Seleccionar la base de datos y colección
db = client.ProyectoFinal
coleccion = db.pedidos

# Obtener todos los documentos (pedidos) de la colección
pedidos = list(coleccion.find({}))  # Lo convertimos en lista para manipular

# Ahora crear DataFrame de pandas con esos datos
df = pd.DataFrame(pedidos)

# Mostrar filas donde la cantidad > 2
# print(df[df["cantidadComida"] > 2])

# Top 5 comidas más pedidas
# print(df['comida'].value_counts().head(5))

# Mostrar las 5 bebidas más consumidas
# bebidas_mas_consumidas = df['bebida'].value_counts().head(5)
# print("🍺 Bebidas más consumidas:")
# print(bebidas_mas_consumidas)

df['precioComida'] = pd.to_numeric(df['precioComida'], errors='coerce')
df['precioBebida'] = pd.to_numeric(df['precioBebida'], errors='coerce')

total_comida = df['precioComida'].sum()
total_bebida = df['precioBebida'].sum()

print(f"Total gastado en comida: {total_comida:.2f} €")
print(f"Total gastado en bebida: {total_bebida:.2f} €")

# print("Valores válidos en 'precioComida':", df['precioComida'].notna().sum())
# print("Valores válidos en 'precioBebida':", df['precioBebida'].notna().sum())



# from pymongo import MongoClient
# import pandas as pd

# df = pd.read_csv("pedidos.csv")
# # Pega tu URI aquí (con usuario, contraseña y base de datos correcta)
# uri = "mongodb+srv://mongodb:mongodb@nzcluster-01.wwv07cx.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=NZCluster-01"

# client = MongoClient(uri)

# # Selecciona la base de datos
# db = client.ProyectoFinal

# # Selecciona la colección
# coleccion = db.pedidos

# # # Saca todos los documentos
# # pedidos = coleccion.find({})  # {} significa sin filtro, trae todo

# # # Recorre y muestra
# # for pedido in pedidos:
# #     print(pedido)

# df[df["cantidad"] > 2]














